import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
// import { router } from '../Routes/posts.routes'

const app = express()

//middlewares
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

//routes
// app.use('/api/v1', router)

app.listen(7070, () => console.log('Server is listening on port 7070'))
