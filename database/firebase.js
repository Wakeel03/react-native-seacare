import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDSrEGUSMd6gNdlcNDf4aIlbqBAaX26390",
  authDomain: "seacare-1d55b.firebaseapp.com",
  projectId: "seacare-1d55b",
  storageBucket: "seacare-1d55b.appspot.com",
  messagingSenderId: "652587524864",
  appId: "1:652587524864:web:4b117cd30453f357e7c9e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)

export default app