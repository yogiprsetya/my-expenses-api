/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import { HttpException } from 'model/HttpException'

export const errorHandler = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const status = 500
  const message = 'Something went wrong'

  response.status(status).send({
    message,
    status
  })
}
