import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-950 text-white">
            <Navbar />

            <div className="flex flex-col sm:flex-row">
                <Sidebar />

                <main className="min-w-0 flex-1 p-4 sm:p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout