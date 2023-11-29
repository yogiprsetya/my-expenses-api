import admin, { ServiceAccount } from 'firebase-admin'
import serviceAccount from './my-expenses-b7515-firebase-adminsdk-nr9d3-fea63baacc.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount)
})

const db = admin.firestore()
const auth = admin.auth()
export { admin, db, auth }
