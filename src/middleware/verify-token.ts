import { HttpCode } from 'constant/error-code'
import { Request, Response, NextFunction } from 'express'
import { UserModel } from 'model/User'
import { auth } from 'config/admin'
import { FirebaseError } from 'firebase/app'

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1] ?? ''

  if (!token) return res.status(HttpCode.UNAUTHORIZED).json({ message: 'Unauthorized' })

  try {
    const payload = await auth.verifyIdToken(token)

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
      const error = e as FirebaseError

      return res.status(HttpCode.UNAUTHORIZED).json({
        message:
          error.code === 'auth/id-token-expired' ? 'Sesi habis, login kembali.' : error.message
      })
    }

    return res.json({ message: 'Internal Error' })
  }
}
