import { useState } from "react"

function Navbar({menuOpen, setMenuOpen}) {

    return (
        <header className="h-16 border-b border-gray-800 bg-gray-950 px-6 flex items-center justify-between">

            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-900 hover:text-white md:hidden"
            >
                ☰
            </button>

            <h1 className="text-xl font-bold text-white ">
                SpendWise
            </h1>

            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                    R
                </div>

                <span className="text-gray-300">
                    Rakshit
                </span>
            </div>
        </header>
    )
}

export default Navbar