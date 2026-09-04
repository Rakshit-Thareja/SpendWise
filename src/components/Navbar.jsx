import { useAuth } from '../context/AuthContext'

function Navbar({ menuOpen, setMenuOpen }) {
    const { user, displayName } = useAuth()

    const name = displayName || user?.displayName || 'User'
    const initial = name.charAt(0).toUpperCase()

    return (
        <header className="flex h-16 items-center border-b border-gray-800 bg-gray-950 px-4 sm:px-6">

            {/* Left side - Logo + SpendWise */}

            <div className="flex items-center gap-3">

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-900 hover:text-white md:hidden"
                    aria-label="Toggle menu"
                >
                    ☰
                </button>

                <div className="flex items-center gap-2">
                    <img
                        src={`${import.meta.env.BASE_URL}favicon.svg`}
                        alt="SpendWise"
                        className="h-9 w-9"
                    />

                    <h1 className="text-xl font-bold text-white">
                        SpendWise
                    </h1>
                </div>

            </div>


            {/* Right side - User */}

            <div className="ml-auto flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
                    {initial}
                </div>

                <span className="hidden text-gray-300 sm:block">
                    {name}
                </span>

            </div>

        </header>
    )
}

export default Navbar