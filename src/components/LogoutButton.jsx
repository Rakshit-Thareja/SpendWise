import { useState } from 'react'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import { auth } from '../firebase/firebase'

function LogoutButton() {
    const navigate = useNavigate()
    const [showConfirm, setShowConfirm] = useState(false)
    const [loggingOut, setLoggingOut] = useState(false)

    const handleLogout = async () => {
        if (loggingOut) {
            return
        }

        setLoggingOut(true)

        try {
            await signOut(auth)
            navigate('/auth')
        } catch (error) {
            console.error('Failed to log out:', error)
            setLoggingOut(false)
            setShowConfirm(false)
        }
    }

    return (
        <>
            <button
                type="button"
                onClick={() => setShowConfirm(true)}
                className="flex w-full items-center rounded-lg px-4 py-3 text-sm text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
            >
                <span className="mr-3 text-base">
                    🚪
                </span>

                <span>
                    Logout
                </span>
            </button>

            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-xl">
                        <h2 className="text-xl font-semibold text-white">
                            Logout
                        </h2>

                        <p className="mt-2 text-sm text-gray-400">
                            Are you sure you want to logout?
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setShowConfirm(false)}
                                disabled={loggingOut}
                                className="rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-gray-800 hover:text-white disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleLogout}
                                disabled={loggingOut}
                                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {loggingOut
                                    ? 'Logging out...'
                                    : 'Yes, Logout'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default LogoutButton