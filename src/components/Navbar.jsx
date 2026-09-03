import { useAuth } from '../context/AuthContext'

function Navbar({ menuOpen, setMenuOpen }) {
    const { user, displayName } = useAuth()

    const name = displayName || user?.displayName || 'User'
    const initial = name.charAt(0).toUpperCase()

    return (
        <header className="flex h-16 items-center justify-between border-b border-gray-800 bg-gray-950 px-6">
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-900 hover:text-white md:hidden"
            >
                ☰
            </button>

            <h1 className="text-xl font-bold text-white">
                SpendWise
            </h1>

            <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
                    {initial}
                </div>

                <span className="text-gray-300">
                    {name}
                </span>
            </div>
        </header>
    )
}

export default Navbar
