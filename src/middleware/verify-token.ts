import { HttpCode } from 'constant/error-code'
import { Request, Response, NextFunction } from 'express'
import { OAuth2Client } from 'google-auth-library'
import { UserModel } from 'model/User'

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization
  const client = new OAuth2Client()

  if (!token) return res.status(HttpCode.UNAUTHORIZED).json({ message: 'Unauthorized' })

  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token?.split(' ')[1] ?? '',
      audience: process.env.GOOGLE_CLIENT_ID
    })

    const payload = ticket.getPayload()

    if (payload) {
      const user = new UserModel({
        userId: payload.sub,
        name: payload.name ?? '',
        email: payload.email ?? ''
      })

      req.user = user
      return next()
    }
  }

  verify().catch((e) => {
    if (e instanceof Error) {
      return res.status(HttpCode.UNAUTHORIZED).json({ message: e.message })
    }

    return res.json({ message: 'Internal Error' })
  })
}
