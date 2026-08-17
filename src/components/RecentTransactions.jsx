const transactions = [
    {
        id: 1,
        name: 'Lunch',
        category: 'Food',
        amount: 350,
        date: 'Aug 17, 2026',
        icon: '🍔',
    },
    {
        id: 2,
        name: 'Uber',
        category: 'Transport',
        amount: 220,
        date: 'Aug 17, 2026',
        icon: '🚗',
    },
    {
        id: 3,
        name: 'New T-shirt',
        category: 'Shopping',
        amount: 1200,
        date: 'Aug 16, 2026',
        icon: '🛍️',
    },
    {
        id: 4,
        name: 'Udemy Course',
        category: 'Education',
        amount: 799,
        date: 'Aug 15, 2026',
        icon: '📚',
    },
]

function RecentTransactions() {
    return (
        <div className="mt-6 rounded-xl border border-gray-800 bg-gray-900 p-5">
            <div className="mb-5 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-white">
                        Recent Transactions
                    </h3>

                    <p className="text-sm text-gray-400">
                        Your latest spending activity
                    </p>
                </div>

                <button className="text-sm text-indigo-400 hover:text-indigo-300">
                    View All →
                </button>
            </div>

            <div className="space-y-3">
                {transactions.map((transaction) => (
                    <div
                        key={transaction.id}
                        className="flex items-center justify-between rounded-lg bg-gray-800/50 p-4"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-xl">
                                {transaction.icon}
                            </div>

                            <div>
                                <p className="font-medium text-white">
                                    {transaction.name}
                                </p>

                                <p className="text-sm text-gray-400">
                                    {transaction.category} • {transaction.date}
                                </p>
                            </div>
                        </div>

                        <p className="font-semibold text-red-400">
                            -₹{transaction.amount.toLocaleString('en-IN')}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RecentTransactions