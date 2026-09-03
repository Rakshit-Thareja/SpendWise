import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, updateProfile } from 'firebase/auth'

import { auth } from '../firebase/firebase'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [displayName, setDisplayName] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (currentUser) => {
                setUser(currentUser)
                setDisplayName(currentUser?.displayName || '')
                setLoading(false)
            }
        )

        return unsubscribe
    }, [])

    const updateUserDisplayName = async (name) => {
        const trimmedName = name.trim()

        if (!auth.currentUser || !trimmedName) {
            return
        }

        await updateProfile(auth.currentUser, {
            displayName: trimmedName,
        })

        setDisplayName(trimmedName)
        setUser({ ...auth.currentUser })
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                displayName,
                loading,
                updateUserDisplayName,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}
