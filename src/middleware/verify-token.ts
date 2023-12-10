import { HttpCode } from 'constant/error-code'
import { Request, Response, NextFunction } from 'express'
import { UserModel } from 'model/User'
import { auth } from 'config/admin'

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1] ?? ''

  if (!token) return res.status(HttpCode.UNAUTHORIZED).json({ message: 'Unauthorized' })

  try {
    const payload = await auth.verifyIdToken(token)
    console.log(payload)

    if (payload) {
      const user = new UserModel({
        userId: payload.uid,
        name: payload.name ?? '',
        email: payload.email ?? ''
      })

      req.user = user
      return next()
    }

    return res.status(HttpCode.UNAUTHORIZED).json({ message: 'Unauthorized' })
  } catch (e) {
    if (e instanceof Error) {
      return res.status(HttpCode.UNAUTHORIZED).json({ message: e.message })
    }

    return res.json({ message: 'Internal Error' })
  }
}
