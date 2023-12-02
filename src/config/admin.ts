import admin, { ServiceAccount } from 'firebase-admin'
import serviceAccount from './firebase-service.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount)
})

const db = admin.firestore()
const auth = admin.auth()
export { admin, db, auth }
