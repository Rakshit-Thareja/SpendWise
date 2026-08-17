import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-950 text-white">
            <Navbar />

            <div className="flex">
                <Sidebar />

                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout