import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children }) {
    const { user, loading } = useAuth()

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-950">
                <p className="text-gray-400">
                    Loading SpendWise...
                </p>
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/auth" replace />
    }

    return children
}

export default ProtectedRoute
