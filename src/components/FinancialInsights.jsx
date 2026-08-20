function FinancialInsights({ expenses, income }) {
    const totalExpenses = expenses.reduce(
        (total, expense) => {
            total += expense.amount
            return total
        },
        0
    )

    const categoryTotals = expenses.reduce(
        (totals, expense) => {
            if (totals[expense.category]) {
                totals[expense.category] += expense.amount
            } else {
                totals[expense.category] = expense.amount
            }

            return totals
        },
        {}
    )

    let highestCategory = null

    const categoryEntries = Object.entries(categoryTotals)

    if (categoryEntries.length > 0) {
        highestCategory = categoryEntries.reduce(
            (highest, current) => {
                if (current[1] > highest[1]) {
                    return current
                }

                return highest
            },
            categoryEntries[0]
        )
    }

    const savings = income - totalExpenses

    const savingsPercentage =
        income > 0
            ? Math.max(0, (savings / income) * 100)
            : 0

    let savingsMessage
    let savingsIcon

    if (savings > 0) {
        savingsMessage = "You're saving money"
        savingsIcon = "💰"
    } else if (savings === 0) {
        savingsMessage = "You're breaking even"
        savingsIcon = "⚖️"
    } else {
        savingsMessage = "You're spending more than your income"
        savingsIcon = "⚠️"
    }

    return (
        <div className="mt-6 rounded-2xl border border-gray-800 bg-gray-900 p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">
                    💡 Financial Insights
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                    A quick look at your financial habits.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                {/* Highest Spending */}

                <div className="rounded-xl border border-gray-800 bg-gray-950 p-5">
                    <div className="flex items-center gap-3">
                        <div className="text-2xl">
                            🛍️
                        </div>

                        <div>
                            <p className="text-sm text-gray-400">
                                Highest Spending
                            </p>

                            {highestCategory ? (
                                <>
                                    <p className="mt-1 text-lg font-semibold text-white">
                                        {highestCategory[0]}
                                    </p>

                                    <p className="text-xl font-bold text-indigo-400">
                                        ₹{highestCategory[1].toLocaleString('en-IN')}
                                    </p>
                                </>
                            ) : (
                                <p className="mt-1 text-gray-500">
                                    No expenses yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Total Spending */}

                <div className="rounded-xl border border-gray-800 bg-gray-950 p-5">
                    <div className="flex items-center gap-3">
                        <div className="text-2xl">
                            📊
                        </div>

                        <div>
                            <p className="text-sm text-gray-400">
                                Total Spending
                            </p>

                            <p className="mt-1 text-xl font-bold text-white">
                                ₹{totalExpenses.toLocaleString('en-IN')}
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                Across all transactions
                            </p>
                        </div>
                    </div>
                </div>

                {/* Savings */}

                <div className="rounded-xl border border-gray-800 bg-gray-950 p-5">
                    <div className="flex items-center gap-3">
                        <div className="text-2xl">
                            {savingsIcon}
                        </div>

                        <div>
                            <p className="text-sm text-gray-400">
                                Savings Rate
                            </p>

                            <p
                                className={`mt-1 text-xl font-bold ${savings >= 0
                                    ? 'text-green-400'
                                    : 'text-red-400'
                                    }`}
                            >
                                {savingsPercentage.toFixed(1)}%
                            </p>

                            <p
                                className={`mt-1 text-sm ${savings >= 0
                                    ? 'text-green-400'
                                    : 'text-red-400'
                                    }`}
                            >
                                {savingsMessage}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default FinancialInsights