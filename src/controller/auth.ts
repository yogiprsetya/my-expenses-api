// import { Request, Response } from 'express'
// import { body } from 'express-validator'
import { Controller } from 'interface/controller'
// import { validate } from 'middleware/validate'

// const validateGenerateToken = [body('code').notEmpty().withMessage('Field `code` is required')]

// const validateRefreshToken = [
//   body('refreshToken').notEmpty().withMessage('Field `refreshToken` is required')
// ]

export class AuthController extends Controller {
  public path = '/auth/google'

  constructor() {
    super()
    this.initializeRoutes()
  }

  private initializeRoutes() {
    // this.router
    //   .post(`${this.path}/generate-token`, validateGenerateToken, validate, this.GenerateToken)
    //   .post(`${this.path}/refresh-token`, validateRefreshToken, validate, this.RefreshToken)
  }

  // private GenerateToken = async (req: Request, res: Response) => {
  //   const data = req.body

  //   return data
  // }

  // private RefreshToken = (req: Request, res: Response) => {
  //   const data = req.body

  //   return data
  // }
}
