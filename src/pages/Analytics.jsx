import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'

function Analytics({ expenses }) {


    const totalExpenses = expenses.reduce(
        (total, expense) => total + expense.amount,
        0
    )

    const averageExpense =
        expenses.length > 0
            ? totalExpenses / expenses.length
            : 0

    const highestExpense =
        expenses.length > 0
            ? expenses.reduce(
                (highest, expense) =>
                    expense.amount > highest.amount
                        ? expense
                        : highest,
                expenses[0]
            )
            : null

    const categoryTotals = expenses.reduce((totals, expense) => {
        if (totals[expense.category]) {
            totals[expense.category] += expense.amount
        } else {
            totals[expense.category] = expense.amount
        }

        return totals
    }, {})

    const highestCategory = Object.entries(categoryTotals).reduce(
        (highest, current) =>
            current[1] > highest[1]
                ? current
                : highest,
        ['', 0]
    )

    const dailySpending = expenses.reduce((totals, expense) => {
        if (totals[expense.date]) {
            totals[expense.date] += expense.amount
        } else {
            totals[expense.date] = expense.amount
        }

        return totals
    }, {})

    const dailySpendingData = Object.entries(dailySpending)
        .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
        .map(([date, total]) => ({
            date,
            total,
        }))

    return (
        <div>
            <p className="text-sm font-medium text-indigo-400">
                Financial Insights
            </p>

            <h2 className="mt-1 text-3xl font-bold tracking-tight text-white">
                Analytics
            </h2>

            <p className="mt-2 text-gray-400">
                Understand your spending patterns and make smarter financial decisions.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">

                {/* Total Spending */}

                <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
                    <p className="text-sm text-gray-400">
                        Total Spending
                    </p>

                    <p className="mt-2 text-3xl font-bold text-white">
                        ₹{totalExpenses.toLocaleString('en-IN')}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                        Across all expenses
                    </p>
                </div>

                {/* Average Expense */}

                <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
                    <p className="text-sm text-gray-400">
                        Average Expense
                    </p>

                    <p className="mt-2 text-3xl font-bold text-white">
                        ₹{averageExpense.toFixed(2)}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                        Per transaction
                    </p>
                </div>

                {/* Highest Expense */}

                <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
                    <p className="text-sm text-gray-400">
                        Highest Expense
                    </p>

                    <p className="mt-2 text-3xl font-bold text-red-400">
                        ₹{highestExpense
                            ? highestExpense.amount.toLocaleString('en-IN')
                            : 0}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                        {highestExpense
                            ? highestExpense.description
                            : 'No expenses yet'}
                    </p>
                </div>

            </div>
            <div className="mt-8 rounded-2xl border border-gray-800 bg-gray-900 p-6">

                <h3 className="text-xl font-semibold text-white">
                    Spending by Category
                </h3>

                <p className="mt-1 text-sm text-gray-400">
                    See where most of your money is going.
                </p>

                <div className="mt-6 space-y-5">
                    {Object.entries(categoryTotals).map(
                        ([category, total]) => {
                            const percentage =
                                totalExpenses > 0
                                    ? (total / totalExpenses) * 100
                                    : 0

                            return (
                                <div key={category}>
                                    <div className="flex justify-between">
                                        <span className="font-medium text-white">
                                            {category}
                                        </span>

                                        <span className="text-sm text-gray-400">
                                            ₹{total.toLocaleString('en-IN')}
                                        </span>
                                    </div>

                                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-800">
                                        <div
                                            className="h-full rounded-full bg-indigo-500 transition-all duration-500"
                                            style={{
                                                width: `${percentage}%`,
                                            }}
                                        />
                                    </div>

                                    <p className="mt-1 text-xs text-gray-500">
                                        {percentage.toFixed(1)}% of total spending
                                    </p>
                                </div>
                            )
                        }
                    )}
                </div>
            </div>
            {highestCategory[1] > 0 && (
                <div className="mt-6 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-5">
                    <p className="text-sm font-medium text-indigo-400">
                        💡 Spending Insight
                    </p>

                    <p className="mt-2 text-white">
                        Your highest spending category is{' '}
                        <span className="font-semibold text-indigo-400">
                            {highestCategory[0]}
                        </span>{' '}
                        at{' '}
                        <span className="font-semibold">
                            ₹{highestCategory[1].toLocaleString('en-IN')}
                        </span>.
                    </p>
                </div>
            )}

            <div className="mt-8 rounded-2xl border border-gray-800 bg-gray-900 p-6">
                <h3 className="text-xl font-semibold text-white">
                    Spending Trend
                </h3>

                <p className="mt-1 text-sm text-gray-400">
                    Track your spending over time.
                </p>

                {dailySpendingData.length > 0 ? (
                    <div className="mt-6 h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={dailySpendingData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />

                                <XAxis
                                    dataKey="date"
                                    stroke="#9CA3AF"
                                    tickFormatter={(date) =>
                                        new Date(date).toLocaleDateString('en-IN', {
                                            day: 'numeric',
                                            month: 'short',
                                        })
                                    }
                                />

                                <YAxis
                                    stroke="#9CA3AF"
                                />

                                <Tooltip
                                    labelFormatter={(date) =>
                                        new Date(date).toLocaleDateString('en-IN', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })
                                    }
                                    formatter={(value) => [
                                        `₹${Number(value).toLocaleString('en-IN')}`,
                                        'Spending',
                                    ]}
                                    contentStyle={{
                                        backgroundColor: '#111827',
                                        border: '1px solid #374151',
                                        borderRadius: '8px',
                                        color: '#fff',
                                    }}
                                />

                                <Line
                                    type="monotone"
                                    dataKey="total"
                                    stroke="#6366F1"
                                    strokeWidth={3}
                                    dot={{ r: 4 }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="mt-6 flex h-80 items-center justify-center rounded-xl border border-dashed border-gray-700">
                        <p className="text-sm text-gray-500">
                            Add expenses to see your spending trend.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Analytics