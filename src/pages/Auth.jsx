import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth'

import { auth } from '../firebase/firebase'
import Button from '../components/Button'

function Auth() {
    const navigate = useNavigate()

    const [isLogin, setIsLogin] = useState(true)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()

        setError('')

        if (!email || !password) {
            setError('Please enter your email and password.')
            return
        }

        setLoading(true)

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                )
            } else {
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                )
            }

            navigate('/')
        } catch (error) {
            if (error.code === 'auth/invalid-credential') {
                setError('Invalid email or password.')
            } else if (error.code === 'auth/email-already-in-use') {
                setError('An account with this email already exists.')
            } else if (error.code === 'auth/weak-password') {
                setError('Password should be at least 6 characters.')
            } else if (error.code === 'auth/invalid-email') {
                setError('Please enter a valid email address.')
            } else if (error.code === 'auth/operation-not-allowed') {
                setError('Email/password sign-in is not enabled for this project.')
            } else if (error.code === 'auth/too-many-requests') {
                setError('Too many attempts. Please wait a few minutes before trying again.')
            } else if (error.code === 'auth/network-request-failed') {
                setError('Network error. Please check your connection and try again.')
            } else {
                console.error('Firebase authentication failed:', error)
                setError('Authentication failed. Please try again in a moment.')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <p className="text-sm font-medium text-indigo-400">
                        SpendWise
                    </p>

                    <h1 className="mt-2 text-3xl font-bold text-white">
                        {isLogin
                            ? 'Welcome back'
                            : 'Create your account'}
                    </h1>

                    <p className="mt-2 text-gray-400">
                        {isLogin
                            ? 'Sign in to manage your finances.'
                            : 'Start managing your finances with SpendWise.'}
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="rounded-2xl border border-gray-800 bg-gray-900 p-6"
                >
                    <div className="space-y-5">
                        <div>
                            <label className="mb-2 block text-sm text-gray-300">
                                Email
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                placeholder="you@example.com"
                                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm text-gray-300">
                                Password
                            </label>

                            <input
                                type="password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                placeholder="••••••••"
                                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-red-400">
                                ⚠️ {error}
                            </p>
                        )}

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full"
                        >
                            {loading
                                ? 'Please wait...'
                                : isLogin
                                    ? 'Sign In'
                                    : 'Create Account'}
                        </Button>
                    </div>
                </form>

                <div className="mt-5 text-center">
                    <button
                        type="button"
                        onClick={() => {
                            setIsLogin(!isLogin)
                            setError('')
                        }}
                        className="text-sm text-gray-400 hover:text-white"
                    >
                        {isLogin
                            ? "Don't have an account? "
                            : 'Already have an account? '}

                        <span className="font-medium text-indigo-400">
                            {isLogin ? 'Sign Up' : 'Sign In'}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Auth
