import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

function readFirebaseEnv(name) {
    const value = import.meta.env[name]

    if (typeof value !== 'string') {
        return ''
    }

    // GitHub Actions and some .env files keep wrapping quotes/spaces,
    // which Firebase treats as part of the API key and rejects.
    return value.trim().replace(/^['"]+|['"]+$/g, '').trim()
}

const firebaseConfig = {
    apiKey: readFirebaseEnv('VITE_FIREBASE_API_KEY'),
    authDomain: readFirebaseEnv('VITE_FIREBASE_AUTH_DOMAIN'),
    projectId: readFirebaseEnv('VITE_FIREBASE_PROJECT_ID'),
    storageBucket: readFirebaseEnv('VITE_FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: readFirebaseEnv('VITE_FIREBASE_MESSAGING_SENDER_ID'),
    appId: readFirebaseEnv('VITE_FIREBASE_APP_ID'),
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)