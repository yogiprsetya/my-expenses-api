import { Router } from 'express'

export interface IController {
  router: Router
}

export class Controller implements IController {
  public router = Router()
}
