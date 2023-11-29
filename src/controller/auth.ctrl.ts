import { auth } from 'config/admin'
import { Request, Response } from 'express'

export const signupWithGoogle = async (req: Request, res: Response) => {
  const authUser = await auth.createUser({
    email: req.body.email,
    password: req.body.password,
    emailVerified: false,
    disabled: false
  })

  res.json({ message: 'User created', authUser })
}
