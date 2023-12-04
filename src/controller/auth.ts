import { HttpCode } from 'constant/error-code'
import { Request, Response } from 'express'
import { body } from 'express-validator'
import { OAuth2Client, UserRefreshClient } from 'google-auth-library'
import { Controller } from 'interface/controller'
import { validate } from 'middleware/validate'

const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'postmessage'
)

const validateGenerateToken = [body('code').notEmpty().withMessage('Field `code` is required')]

const validateRefreshToken = [
  body('refreshToken').notEmpty().withMessage('Field `refreshToken` is required')
]

export class AuthController extends Controller {
  public path = '/auth/google'

  constructor() {
    super()
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router
      .post(`${this.path}/generate-token`, validateGenerateToken, validate, this.GenerateToken)
      .post(`${this.path}/refresh-token`, validateRefreshToken, validate, this.RefreshToken)
  }

  private GenerateToken = async (req: Request, res: Response) => {
    const data = req.body

    return oAuth2Client
      .getToken(data.code)
      .then(({ tokens, res: resToken }) => {
        if (resToken && resToken.status !== 200) {
          return res
            .status(resToken.status || HttpCode.BAD_REQUEST)
            .json({ message: 'Bad Request' })
        }

        return res.json(tokens)
      })
      .catch((err) => {
        return res.status(HttpCode.BAD_REQUEST).json({ message: err.message || 'Something wrong!' })
      })
  }

  private RefreshToken = (req: Request, res: Response) => {
    const data = req.body

    const user = new UserRefreshClient(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      data.refreshToken
    )

    return user
      .refreshAccessToken()
      .then(({ credentials, res: resToken }) => {
        if (resToken && resToken.status !== 200) {
          return res
            .status(resToken.status || HttpCode.BAD_REQUEST)
            .json({ message: 'Bad Request' })
        }

        return res.json(credentials)
      })
      .catch((err) => {
        return res.status(HttpCode.BAD_REQUEST).json({ message: err.message || 'Something wrong!' })
      })
  }
}
