import { signupWithGoogle } from 'controller/auth'
import express from 'express'

const router = express.Router()

router.post('/signup', signupWithGoogle)

export { router as authRoutes }
