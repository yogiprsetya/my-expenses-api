import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { VerifyToken } from 'middleware/verify-token'
import { authRoutes } from 'router/auth'

dotenv.config()
const app = express()

//middlewares
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(VerifyToken)

//routes
app.use('/api/v1', authRoutes)

app.listen(7070, () => console.log('Server is listening on port 7070'))
