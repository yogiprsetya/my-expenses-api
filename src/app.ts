import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import Controller from 'interface/controller'
import { errorHandler } from 'middleware/error-handling'

// const app = express()

// //middlewares
// app.use(express.json())
// app.use(cors())
// app.use(express.urlencoded({ extended: true }))
// app.use(bodyParser.json())
// app.use(VerifyToken)

// //routes
// app.use('/api/v1', authRoutes)
// app.use('/api/v1', accountRoutes)

// app.listen(7070, () => console.log('Server is listening on port 7070'))

class App {
  public app: express.Application

  constructor(controllers: Controller[]) {
    this.app = express()

    // this.connectToTheDatabase()
    this.initializeMiddlewares()
    this.initializeControllers(controllers)
    this.initializeErrorHandling()
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`)
    })
  }

  public getServer() {
    return this.app
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json())
    this.app.use(express.json())
    this.app.use(cors())
    this.app.use(express.urlencoded({ extended: true }))
    // this.app.use(cookieParser())
  }

  private initializeErrorHandling() {
    this.app.use(errorHandler)
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/api/v1', controller.router)
    })
  }
}

export default App
