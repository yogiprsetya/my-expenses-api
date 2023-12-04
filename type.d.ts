import { DecodedIdToken } from 'firebase-admin/lib/auth'

declare global {
  namespace Express {
    export interface Request {
      user: DecodedIdToken
    }
  }
}
