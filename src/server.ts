import 'dotenv/config'
import App from './app'
import { AccountController } from 'controller/account'
import { AuthController } from 'controller/auth'
import { IncomeResourceController } from 'controller/income-resource'

const app = new App([new AccountController(), new AuthController(), new IncomeResourceController()])

app.listen()
