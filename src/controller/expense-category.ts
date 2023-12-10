import { Request, Response } from 'express'
import { db } from 'config/firebase'
import { body } from 'express-validator'
import { NatureExpenses } from 'interface/expense-nature'
import { Controller } from 'interface/controller'
import { collection, getDocs, where, query, addDoc } from 'firebase/firestore'
import { TableName } from 'interface/database'
import { verifyToken } from 'middleware/verify-token'
import { validate } from 'middleware/validate'
import { ExpenseCategoryModel } from 'model/ExpenseCategory'
import { okayHandler } from 'helper/responseHandler'
import { HttpCode } from 'constant/error-code'

const validateCreateExpenseCat = [
  body('name').isLength({ min: 2, max: 35 }).withMessage('Field `name` is required'),
  body('nature').isIn(NatureExpenses)
]

export class ExpenseCategoryController extends Controller {
  public path = '/expense-category'
  private SelectExpenseTable = collection(db, TableName.EXPENSE_CATEGORY)

  constructor() {
    super()
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router
      .all(this.path, verifyToken)
      .post(this.path, validateCreateExpenseCat, validate, this.CreateExpenseCa)
      .get(this.path, this.GetExpenseCat)
  }

  private CreateExpenseCa = async (req: Request, res: Response) => {
    const data = req.body

    await addDoc(this.SelectExpenseTable, {
      userId: req.user.userId,
      name: data.name,
      nature: data.nature
    })

    res.status(HttpCode.OK).json(okayHandler({ message: 'OK' }))
  }

  private GetExpenseCat = async (req: Request, res: Response) => {
    const selects = query(this.SelectExpenseTable, where('userId', '==', req.user.userId))
    const snap = await getDocs(selects)

    const result = snap.docs.map((d) => {
      const resource = new ExpenseCategoryModel({
        id: d.id,
        name: d.data().name,
        nature: d.data().nature
      })
      return resource
    })

    res.status(HttpCode.OK).json(okayHandler({ message: 'OK', result: result }))
  }
}
