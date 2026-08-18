function RecentTransactions({ expenses }) {
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
                {expenses.length === 0 ? (
                    <p className="text-gray-400">
                        No transactions yet.
                    </p>
                ) : (
                    expenses.slice(0, 5).map((expense) => (
                        <div
                            key={expense.id}
                            className="flex items-center justify-between rounded-lg bg-gray-800/50 p-4"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-xl">
                                    💸
                                </div>

                                <div>
                                    <p className="font-medium text-white">
                                        {expense.description}
                                    </p>

                                    <p className="text-sm text-gray-400">
                                        {expense.category} • {expense.date}
                                    </p>
                                </div>
                            </div>

                            <p className="font-semibold text-red-400">
                                -₹{expense.amount.toLocaleString('en-IN')}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default RecentTransactions