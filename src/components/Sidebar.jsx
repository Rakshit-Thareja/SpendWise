import { NavLink } from 'react-router-dom'

function Sidebar() {
    const links = [
        { name: 'Dashboard', path: '/' },
        { name: 'Expenses', path: '/expenses' },
        { name: 'Budget', path: '/budget' },
        { name: 'Analytics', path: '/analytics' },
    ]

    return (
        <aside className="w-64 min-h-[calc(100vh-4rem)] border-r border-gray-800 bg-gray-950 p-4">
            <nav className="space-y-2">
                {links.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        className={({ isActive }) =>
                            `block rounded-lg px-4 py-3 transition ${isActive
                                ? 'bg-indigo-600 text-white'
                                : 'text-gray-400 hover:bg-gray-900 hover:text-white'
                            }`
                        }
                    >
                        {link.name}
                    </NavLink>
                ))}
            </nav>
        </aside>
    )
}

export default Sidebar