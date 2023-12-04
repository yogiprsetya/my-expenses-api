interface Params {
  userId: string
  name: string
  email: string
}

export class UserModel implements Params {
  userId: string
  name: string
  email: string

  constructor({ userId, name, email }: Params) {
    this.userId = userId
    this.name = name
    this.email = email
  }
}
