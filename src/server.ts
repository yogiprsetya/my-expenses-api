import 'dotenv/config'
import App from './app'
import { AccountController } from 'controller/account'
import { AuthController } from 'controller/auth'

const app = new App([new AccountController(), new AuthController()])

app.listen()
