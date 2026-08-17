function Navbar() {
    return (
        <header className="h-16 border-b border-gray-800 bg-gray-950 px-6 flex items-center justify-between">
            <h1 className="text-xl font-bold text-white">
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