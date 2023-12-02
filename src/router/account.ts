import { GetAccount } from 'controller/account'
import express from 'express'

const router = express.Router()

router.get('/account', GetAccount)

export { router as accountRoutes }
