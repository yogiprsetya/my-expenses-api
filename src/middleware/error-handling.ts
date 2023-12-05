/* eslint-disable @typescript-eslint/no-unused-vars */
import { FirestoreErrorCodeMapping } from 'constant/error-code'
import { NextFunction, Request, Response } from 'express'
import { FirestoreError } from 'firebase/firestore'
import { failHandler } from 'helper/responseHandler'
import { HttpException } from 'model/HttpException'

export const errorHandler = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const status = 500
  const message = 'Something went wrong'

  if (error instanceof FirestoreError) {
    return response.status(FirestoreErrorCodeMapping[error.code]).json(failHandler(error))
  }

  response.status(status).send({
    message,
    status
  })
}
