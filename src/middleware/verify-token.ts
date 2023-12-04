import { auth } from 'config/admin'
import { HttpCode } from 'constant/error-code'
import { Request, Response, NextFunction } from 'express'

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization

  if (!token) return res.status(HttpCode.UNAUTHORIZED).json({ message: 'Unauthorized' })

  try {
    const decodeValue = await auth.verifyIdToken(token.split(' ')[1])
    console.log(decodeValue)
    if (decodeValue) {
      req.user = decodeValue
      return next()
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      return res.json({ message: e.message })
    }

    return res.json({ message: 'Internal Error' })
  }
}
