import { NavLink } from 'react-router-dom'

function Sidebar() {
    const links = [
        { name: 'Dashboard', path: '/', icon: '🏠' },
        { name: 'Expenses', path: '/expenses', icon: '💸' },
        { name: 'Budget', path: '/budget', icon: '🎯' },
        { name: 'Analytics', path: '/analytics', icon: '📊' },
        { name: 'Currency Converter', path: '/currency-converter', icon: '💱',},
    ]

    return (
        <aside className="min-h-[calc(100vh-4rem)] w-60 border-r border-gray-800 bg-gray-950 p-3">
            <nav className="space-y-1">
                {links.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        className={({ isActive }) =>
                            `flex items-center rounded-lg px-4 py-3 text-sm transition ${isActive
                                ? 'bg-indigo-600 text-white shadow-sm'
                                : 'text-gray-400 hover:bg-gray-900 hover:text-white'
                            }`
                        }
                    >
                        <span className="mr-3 text-base">
                            {link.icon}
                        </span>

                        <span>{link.name}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    )
}

export default Sidebar