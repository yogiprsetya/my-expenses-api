import 'dotenv/config'
import App from './app'
import { AccountController } from 'controller/account'

const app = new App([new AccountController()])

app.listen()
