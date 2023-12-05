import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { Request, Response } from 'express'
import { db } from 'config/firebase'
import { body } from 'express-validator'
import { okayHandler } from 'helper/responseHandler'
import { HttpCode } from 'constant/error-code'
import { AccountModel } from 'model/Account'
import { Controller } from 'interface/controller'
import { verifyToken } from 'middleware/verify-token'
import { validate } from 'middleware/validate'
import { TableName } from 'interface/database'

export const validateCreateAccount = [
  body('name').isLength({ min: 2, max: 25 }).withMessage('Field `name` is required')
]

export class AccountController extends Controller {
  public path = '/account'
  private SelectAccountTable = collection(db, TableName.ACCOUNT)

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

    await addDoc(this.SelectAccountTable, { userId: req.user.userId, name: data.name })
    res.status(HttpCode.OK).json(okayHandler({ message: 'OK' }))
  }

  private GetAccount = async (req: Request, res: Response): Promise<void> => {
    const selects = query(this.SelectAccountTable, where('userId', '==', req.user.userId))
    const snap = await getDocs(selects)

    const result = snap.docs.map((d) => {
      const accounts = new AccountModel(d.id, d.data().name)
      return accounts
    })

    res.status(HttpCode.OK).json(okayHandler({ message: 'OK', result: result }))
  }
}
