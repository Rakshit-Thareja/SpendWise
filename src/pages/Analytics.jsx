import { useState } from 'react'

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
    const [timePeriod, setTimePeriod] = useState('all')

    const getStartDate = () => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        if (timePeriod === '7') {
            const startDate = new Date(today)
            startDate.setDate(today.getDate() - 6)
            return startDate
        }

        if (timePeriod === '30') {
            const startDate = new Date(today)
            startDate.setDate(today.getDate() - 29)
            return startDate
        }

        if (timePeriod === 'month') {
            return new Date(
                today.getFullYear(),
                today.getMonth(),
                1
            )
        }

        return null
    }

    const startDate = getStartDate()

    const filteredExpenses = startDate
        ? expenses.filter((expense) => {
            const expenseDate = new Date(
                `${expense.date}T00:00:00`
            )

            return expenseDate >= startDate
        })
        : expenses

    const totalExpenses = filteredExpenses.reduce(
        (total, expense) => total + expense.amount,
        0
    )

    const totalTransactions = filteredExpenses.length

    // Today's spending

    const today = new Date()

    const todayDate = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, '0'),
        String(today.getDate()).padStart(2, '0'),
    ].join('-')

    const todayExpenses = expenses.filter(
        (expense) => expense.date === todayDate
    )

    const todaySpending = todayExpenses.reduce(
        (total, expense) => total + expense.amount,
        0
    )

    const todayTransactions = todayExpenses.length

    // 7-Day Spending Comparison

    const currentDay = new Date()
    currentDay.setHours(0, 0, 0, 0)

    const current7Start = new Date(currentDay)
    current7Start.setDate(currentDay.getDate() - 6)

    const previous7Start = new Date(currentDay)
    previous7Start.setDate(currentDay.getDate() - 13)

    const previous7End = new Date(currentDay)
    previous7End.setDate(currentDay.getDate() - 7)

    const current7Expenses = expenses.filter((expense) => {
        const expenseDate = new Date(
            `${expense.date}T00:00:00`
        )

        return expenseDate >= current7Start
    })

    const previous7Expenses = expenses.filter((expense) => {
        const expenseDate = new Date(
            `${expense.date}T00:00:00`
        )

        return (
            expenseDate >= previous7Start &&
            expenseDate <= previous7End
        )
    })

    const current7Total = current7Expenses.reduce(
        (total, expense) => total + expense.amount,
        0
    )

    const previous7Total = previous7Expenses.reduce(
        (total, expense) => total + expense.amount,
        0
    )

    const spendingChange =
        previous7Total > 0
            ? ((current7Total - previous7Total) /
                previous7Total) *
            100
            : null

    const averageExpense =
        filteredExpenses.length > 0
            ? totalExpenses / filteredExpenses.length
            : 0

    const highestExpense =
        filteredExpenses.length > 0
            ? filteredExpenses.reduce(
                (highest, expense) =>
                    expense.amount > highest.amount
                        ? expense
                        : highest,
                filteredExpenses[0]
            )
            : null

    const categoryTotals = filteredExpenses.reduce(
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

    // Payment Method Breakdown

    const paymentMethodTotals = filteredExpenses.reduce(
        (totals, expense) => {
            const method = expense.paymentMethod || 'Unknown'

            if (totals[method]) {
                totals[method].amount += expense.amount
                totals[method].count += 1
            } else {
                totals[method] = {
                    amount: expense.amount,
                    count: 1,
                }
            }

            return totals
        },
        {}
    )

    const highestCategory = Object.entries(categoryTotals).reduce(
        (highest, current) =>
            current[1] > highest[1]
                ? current
                : highest,
        ['', 0]
    )

    const dailySpending = filteredExpenses.reduce(
        (totals, expense) => {
            if (totals[expense.date]) {
                totals[expense.date] += expense.amount
            } else {
                totals[expense.date] = expense.amount
            }

            return totals
        },
        {}
    )

    const dailySpendingData = Object.entries(dailySpending)
        .sort(([dateA], [dateB]) =>
            dateA.localeCompare(dateB)
        )
        .map(([date, total]) => ({
            date,
            total,
        }))

    return (
        <div>
            {/* Header */}

            <p className="text-sm font-medium text-indigo-400">
                Financial Insights
            </p>

            <h2 className="mt-1 text-3xl font-bold tracking-tight text-white">
                Analytics
            </h2>

            <p className="mt-2 max-w-2xl text-gray-400">
                Understand your spending patterns and make
                smarter financial decisions.
            </p>

            {/* Time Period Filters */}

            <div className="mt-8 flex flex-wrap gap-2">
                {[
                    { value: 'all', label: 'All Time' },
                    { value: '7', label: 'Last 7 Days' },
                    { value: '30', label: 'Last 30 Days' },
                    { value: 'month', label: 'This Month' },
                ].map((period) => (
                    <button
                        key={period.value}
                        type="button"
                        onClick={() =>
                            setTimePeriod(period.value)
                        }
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition ${timePeriod === period.value
                            ? 'bg-indigo-500 text-white'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                            }`}
                    >
                        {period.label}
                    </button>
                ))}
            </div>

            {/* Summary Cards */}

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {/* Total Spending */}

                <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
                    <p className="text-sm text-gray-400">
                        Total Spending
                    </p>

                    <p className="mt-2 text-3xl font-bold text-white">
                        ₹{totalExpenses.toLocaleString('en-IN')}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                        {timePeriod === 'all'
                            ? 'Across all expenses'
                            : timePeriod === '7'
                                ? 'Across the last 7 days'
                                : timePeriod === '30'
                                    ? 'Across the last 30 days'
                                    : 'Across this month'}
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
                        {timePeriod !== 'all' && (
                            <>
                                {' '}during{' '}
                                {timePeriod === '7'
                                    ? 'the last 7 days'
                                    : timePeriod === '30'
                                        ? 'the last 30 days'
                                        : 'this month'}
                            </>
                        )}
                    </p>
                </div>

                {/* Highest Expense */}

                <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
                    <p className="text-sm text-gray-400">
                        Highest Expense
                    </p>

                    <p className="mt-2 text-3xl font-bold text-red-400">
                        ₹
                        {highestExpense
                            ? highestExpense.amount.toLocaleString(
                                'en-IN'
                            )
                            : 0}
                    </p>

                    <p className="mt-1 truncate text-sm text-gray-500">
                        {highestExpense
                            ? highestExpense.description
                            : 'No expenses yet'}
                    </p>
                </div>

                {/* Total Transactions */}

                <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
                    <p className="text-sm text-gray-400">
                        Total Transactions
                    </p>

                    <p className="mt-2 text-3xl font-bold text-white">
                        {totalTransactions}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                        {timePeriod === 'all'
                            ? 'Across all expenses'
                            : timePeriod === '7'
                                ? 'In the last 7 days'
                                : timePeriod === '30'
                                    ? 'In the last 30 days'
                                    : 'This month'}
                    </p>
                </div>
            </div>

            {/* Additional Insights */}

            <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
                {/* 7-Day Comparison */}

                <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-sm text-gray-400">
                                Recent 7-Day Spending
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                                Compared with the previous 7 days
                            </p>
                        </div>

                        <span
                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${spendingChange === null
                                ? 'bg-gray-800 text-gray-400'
                                : spendingChange > 0
                                    ? 'bg-red-500/10 text-red-400'
                                    : spendingChange < 0
                                        ? 'bg-green-500/10 text-green-400'
                                        : 'bg-gray-800 text-gray-400'
                                }`}
                        >
                            {spendingChange === null
                                ? 'No comparison'
                                : spendingChange > 0
                                    ? 'Higher'
                                    : spendingChange < 0
                                        ? 'Lower'
                                        : 'No change'}
                        </span>
                    </div>

                    {spendingChange !== null ? (
                        <>
                            <p
                                className={`mt-5 text-3xl font-bold ${spendingChange > 0
                                    ? 'text-red-400'
                                    : spendingChange < 0
                                        ? 'text-green-400'
                                        : 'text-white'
                                    }`}
                            >
                                {spendingChange > 0
                                    ? '+'
                                    : ''}
                                {spendingChange.toFixed(1)}%
                            </p>

                            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                                <div>
                                    <p className="text-gray-500">
                                        Current 7 days
                                    </p>

                                    <p className="mt-1 font-medium text-gray-200">
                                        ₹
                                        {current7Total.toLocaleString(
                                            'en-IN'
                                        )}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">
                                        Previous 7 days
                                    </p>

                                    <p className="mt-1 font-medium text-gray-200">
                                        ₹
                                        {previous7Total.toLocaleString(
                                            'en-IN'
                                        )}
                                    </p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <p className="mt-5 text-sm text-gray-500">
                            Not enough previous spending data
                            to compare.
                        </p>
                    )}
                </div>

                {/* Today's Spending */}

                <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-sm text-gray-400">
                                Today's Spending
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                                Spending activity for today
                            </p>
                        </div>

                        <span className="rounded-full bg-indigo-500/10 px-2.5 py-1 text-xs font-medium text-indigo-400">
                            Today
                        </span>
                    </div>

                    <p className="mt-5 text-3xl font-bold text-white">
                        ₹{todaySpending.toLocaleString('en-IN')}
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                        {todayTransactions}{' '}
                        {todayTransactions === 1
                            ? 'transaction'
                            : 'transactions'}{' '}
                        today
                    </p>
                </div>
            </div>

            {/* Spending by Category */}

            <div className="mt-8 rounded-2xl border border-gray-800 bg-gray-900 p-6">
                <h3 className="text-xl font-semibold text-white">
                    Spending by Category
                </h3>

                <p className="mt-1 text-sm text-gray-400">
                    See where most of your money is going.
                </p>

                {Object.keys(categoryTotals).length > 0 ? (
                    <div className="mt-6 space-y-5">
                        {Object.entries(categoryTotals).map(
                            ([category, total]) => {
                                const percentage =
                                    totalExpenses > 0
                                        ? (total /
                                            totalExpenses) *
                                        100
                                        : 0

                                return (
                                    <div key={category}>
                                        <div className="flex items-center justify-between gap-4">
                                            <span className="font-medium text-white">
                                                {category}
                                            </span>

                                            <span className="text-sm text-gray-400">
                                                ₹
                                                {total.toLocaleString(
                                                    'en-IN'
                                                )}
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
                                            {percentage.toFixed(
                                                1
                                            )}
                                            % of total spending
                                        </p>
                                    </div>
                                )
                            }
                        )}
                    </div>
                ) : (
                    <div className="mt-6 flex h-32 items-center justify-center rounded-xl border border-dashed border-gray-700">
                        <p className="text-sm text-gray-500">
                            No expenses for this period.
                        </p>
                    </div>
                )}
            </div>

            {/* Spending by Payment Method */}

            <div className="mt-8 rounded-2xl border border-gray-800 bg-gray-900 p-6">
                <h3 className="text-xl font-semibold text-white">
                    Spending by Payment Method
                </h3>

                <p className="mt-1 text-sm text-gray-400">
                    See how you are paying for your expenses.
                </p>

                {Object.keys(paymentMethodTotals).length > 0 ? (
                    <div className="mt-6 space-y-5">
                        {Object.entries(paymentMethodTotals).map(
                            ([method, data]) => {
                                const percentage =
                                    totalExpenses > 0
                                        ? (data.amount / totalExpenses) * 100
                                        : 0

                                return (
                                    <div key={method}>
                                        <div className="flex items-center justify-between gap-4">
                                            <div>
                                                <p className="font-medium text-white">
                                                    {method}
                                                </p>

                                                <p className="mt-1 text-xs text-gray-500">
                                                    {data.count}{' '}
                                                    {data.count === 1
                                                        ? 'transaction'
                                                        : 'transactions'}
                                                </p>
                                            </div>

                                            <span className="text-sm text-gray-400">
                                                ₹
                                                {data.amount.toLocaleString(
                                                    'en-IN'
                                                )}
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
                ) : (
                    <div className="mt-6 flex h-32 items-center justify-center rounded-xl border border-dashed border-gray-700">
                        <p className="text-sm text-gray-500">
                            No expenses for this period.
                        </p>
                    </div>
                )}
            </div>

            {/* Spending Insight */}

            {highestCategory[1] > 0 && (
                <div className="mt-6 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-5">
                    <p className="text-sm font-medium text-indigo-400">
                        Spending Insight
                    </p>

                    <p className="mt-2 text-white">
                        Your highest spending category is{' '}
                        <span className="font-semibold text-indigo-400">
                            {highestCategory[0]}
                        </span>{' '}
                        at{' '}
                        <span className="font-semibold">
                            ₹
                            {highestCategory[1].toLocaleString(
                                'en-IN'
                            )}
                        </span>
                        .
                    </p>
                </div>
            )}

            {/* Spending Trend */}

            <div className="mt-8 rounded-2xl border border-gray-800 bg-gray-900 p-6">
                <h3 className="text-xl font-semibold text-white">
                    Spending Trend
                </h3>

                <p className="mt-1 text-sm text-gray-400">
                    Track your spending over time.
                </p>

                {dailySpendingData.length > 0 ? (
                    <div className="mt-6 h-80">
                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >
                            <LineChart data={dailySpendingData}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#374151"
                                />

                                <XAxis
                                    dataKey="date"
                                    stroke="#9CA3AF"
                                    tickFormatter={(date) =>
                                        new Date(
                                            `${date}T00:00:00`
                                        ).toLocaleDateString(
                                            'en-IN',
                                            {
                                                day: 'numeric',
                                                month: 'short',
                                            }
                                        )
                                    }
                                />

                                <YAxis stroke="#9CA3AF" />

                                <Tooltip
                                    labelFormatter={(date) =>
                                        new Date(
                                            `${date}T00:00:00`
                                        ).toLocaleDateString(
                                            'en-IN',
                                            {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            }
                                        )
                                    }
                                    formatter={(value) => [
                                        `₹${Number(
                                            value
                                        ).toLocaleString(
                                            'en-IN'
                                        )}`,
                                        'Spending',
                                    ]}
                                    contentStyle={{
                                        backgroundColor:
                                            '#111827',
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