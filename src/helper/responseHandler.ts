/* eslint-disable @typescript-eslint/no-explicit-any */

import { HttpCode } from 'constant/error-code'
import { FirestoreError } from 'firebase/firestore'

interface OkayResType {
  message: keyof typeof HttpCode
  result?: any
}

export const okayHandler = ({ message, result }: OkayResType) => ({
  message,
  result,
  success: true
})

export const failHandler = ({ message, code }: FirestoreError) => ({
  message,
  code,
  success: false
})
