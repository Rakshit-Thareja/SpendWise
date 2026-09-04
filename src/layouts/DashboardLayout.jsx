import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import { useState } from 'react'

function DashboardLayout({ children }) {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <div className="min-h-screen bg-gray-950 text-white">

            <Navbar
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
            />

            <div className="flex flex-col sm:flex-row">
                <Sidebar
                    menuOpen={menuOpen}
                    setMenuOpen={setMenuOpen}
                />

                <main className="min-w-0 flex-1 p-4 sm:p-6">
                    {children}
                </main>
            </div>

            <Footer />
        </div>
    )
}

export default DashboardLayout