import { signupWithGoogle } from 'controller/auth.ctrl'
import express from 'express'

const router = express.Router()

router.post('/signup', signupWithGoogle)

export { router as authRoutes }
