import 'dotenv/config'
import App from './app'
import { AccountController } from 'controller/account'
import { AuthController } from 'controller/auth'
import { ExpenseCategoryController } from 'controller/expense-category'
import { IncomeResourceController } from 'controller/income-resource'

const app = new App([
  new AccountController(),
  new AuthController(),
  new ExpenseCategoryController(),
  new IncomeResourceController()
])

app.listen()
