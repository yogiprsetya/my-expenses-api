import { CreateAccount, GetAccount, validateCreateAccount } from 'controller/account'
import express from 'express'
import { validate } from 'middleware/validate'

const router = express.Router()

router.post('/account', validateCreateAccount, validate, CreateAccount)
router.get('/account', validateCreateAccount, validate, GetAccount)

export { router as accountRoutes }
