import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Navbar({ menuOpen, setMenuOpen }) {
    const { user, displayName } = useAuth()
    const navigate = useNavigate()

    // Default name = part of email before "@"
    const emailName = user?.email
        ? user.email.split('@')[0]
        : 'User'

    // Use custom name when available, otherwise email username
    const name = displayName || emailName

    // Initial = first character of custom name/email username
    const initial = name.charAt(0).toUpperCase()

    return (
        <header className="flex h-16 items-center border-b border-gray-800 bg-gray-950 px-4 sm:px-6">

            {/* SpendWise Logo + Name */}

            <button
                type="button"
                onClick={() => navigate('/')}
                className="flex items-center gap-3 rounded-lg px-1 py-1 transition hover:bg-gray-900"
                aria-label="Go to dashboard"
            >
                <img
                    src={`${import.meta.env.BASE_URL}favicon.svg`}
                    alt="SpendWise"
                    className="h-9 w-9"
                />

                <h1 className="text-xl font-bold text-white">
                    SpendWise
                </h1>
            </button>

            {/* Mobile Menu */}

            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="ml-2 rounded-lg p-2 text-gray-400 transition hover:bg-gray-900 hover:text-white md:hidden"
                aria-label="Toggle menu"
            >
                ☰
            </button>


            {/* Profile */}

            <button
                type="button"
                onClick={() => navigate('/settings')}
                className="ml-auto flex items-center gap-3 rounded-lg px-2 py-1.5 transition hover:bg-gray-900"
                aria-label="Open settings"
            >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
                    {initial}
                </div>

                <span className="hidden text-gray-300 sm:block">
                    {name}
                </span>
            </button>

        </header>
    )
}

export default Navbar