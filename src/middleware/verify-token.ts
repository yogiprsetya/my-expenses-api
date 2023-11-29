import { auth } from 'config/admin'
import { Request, Response, NextFunction } from 'express'

export const VerifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization

  if (!token) return res.json({ message: 'Unauthorized' })

  try {
    const decodeValue = await auth.verifyIdToken(token.split(' ')[1])

    if (decodeValue) {
      req.user = decodeValue
      return next()
    }
  } catch (e) {
    return res.json({ message: 'Internal Error' })
  }
}
