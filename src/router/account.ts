import { CreateAccount, validateCreateAccount } from 'controller/account'
import express from 'express'
import { validate } from 'middleware/validate'

const router = express.Router()

router.post('/account', validateCreateAccount, validate, CreateAccount)

export { router as accountRoutes }
