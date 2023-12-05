import { FirestoreError, addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { Request, Response } from 'express'
import { db } from 'config/firebase'
import { body } from 'express-validator'
import { failHandler, okayHandler } from 'helper/responseHandler'
import { FirestoreErrorCodeMapping, HttpCode } from 'constant/error-code'
import { AccountModel } from 'model/Account'
import { Controller } from 'interface/controller'
import { verifyToken } from 'middleware/verify-token'
import { validate } from 'middleware/validate'

export const validateCreateAccount = [
  body('name').isLength({ min: 2, max: 25 }).withMessage('Field `name` is required')
]

export class AccountController extends Controller {
  public path = '/account'

  constructor() {
    super()
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router
      .all(this.path, verifyToken)
      .post(this.path, validateCreateAccount, validate, this.CreateAccount)
      .get(this.path, this.GetAccount)
  }

  private CreateAccount = async (req: Request, res: Response) => {
    const data = req.body

    try {
      await addDoc(collection(db, 'accounts'), { userId: req.user.userId, name: data.name })
      res.status(HttpCode.OK).json(okayHandler({ message: 'OK' }))
    } catch (err) {
      const error = err as FirestoreError
      res.status(FirestoreErrorCodeMapping[error.code]).json(failHandler(error))
    }
  }

  private GetAccount = async (req: Request, res: Response): Promise<void> => {
    const selects = query(collection(db, 'accounts'), where('userId', '==', req.user.userId))
    const snap = await getDocs(selects)

    const result = snap.docs.map((d) => {
      const accounts = new AccountModel(d.id, d.data().name)
      return accounts
    })

    res.status(HttpCode.OK).json(okayHandler({ message: 'OK', result: result }))
  }
}
