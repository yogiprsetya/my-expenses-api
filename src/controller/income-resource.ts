import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { Request, Response } from 'express'
import { db } from 'config/firebase'
import { body } from 'express-validator'
import { failHandler, okayHandler } from 'helper/responseHandler'
import { HttpCode } from 'constant/error-code'
import { Controller } from 'interface/controller'
import { verifyToken } from 'middleware/verify-token'
import { validate } from 'middleware/validate'
import { TableName } from 'interface/database'
import { IncomeResourceModel } from 'model/IncomeResource'
import { catchAsync } from 'helper/catch-async'

const validateCreateResource = [
  body('resource').isLength({ min: 2, max: 35 }).withMessage('Field `resource` is required')
]

export class IncomeResourceController extends Controller {
  public path = '/income-resource'
  private SelectIncomeTable = collection(db, TableName.INCOME_RESOURCE)

  constructor() {
    super()
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router
      .all(this.path, verifyToken)
      .post(this.path, validateCreateResource, validate, this.CreateResource)
      .delete(`${this.path}/:id`, this.DeleteResource)
      .get(this.path, this.GetResource)
  }

  private CreateResource = catchAsync(async (req: Request, res: Response) => {
    const data = req.body

    await addDoc(this.SelectIncomeTable, { userId: req.user.userId, resource: data.resource })
    res.status(HttpCode.OK).json(okayHandler({ message: 'OK' }))
  })

  private DeleteResource = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params

    if (!id) {
      return res.status(HttpCode.UNPROCESSABLE_ENTITY).json(
        failHandler({
          message: 'ID not passed',
          code: 'invalid-argument',
          name: 'delete income-resource'
        })
      )
    }

    await deleteDoc(doc(db, TableName.INCOME_RESOURCE, id))
    res.status(HttpCode.OK).json(okayHandler({ message: 'OK' }))
  })

  private GetResource = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const selects = query(this.SelectIncomeTable, where('userId', '==', req.user.userId))
    const snap = await getDocs(selects)

    const result = snap.docs.map((d) => {
      const resource = new IncomeResourceModel(d.id, d.data().resource)
      return resource
    })

    res.status(HttpCode.OK).json(okayHandler({ message: 'OK', result: result }))
  })
}
