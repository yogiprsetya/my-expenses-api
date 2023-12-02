import { addDoc, collection } from 'firebase/firestore'
import { Request, Response } from 'express'
import { db } from 'config/firebase'
import { body } from 'express-validator'

export const validateCreateAccount = [
  body('name').isLength({ min: 2, max: 25 }).withMessage('Field `name` is required')
]

export const CreateAccount = async (req: Request, res: Response) => {
  try {
    const data = req.body
    await addDoc(collection(db, 'accounts'), data)
    res.status(200).send('product created successfully')
  } catch (error) {
    res.status(400).send(error)
  }
}
