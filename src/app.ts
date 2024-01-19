import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { IController } from 'interface/controller'
import { errorHandler } from 'middleware/error-handling'

class App {
  public app: express.Application

  constructor(controllers: IController[]) {
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

  private initializeControllers(controllers: IController[]) {
    controllers.forEach((controller) => {
      this.app.use('/api/v1', controller.router)
    })
  }
}

export default App
