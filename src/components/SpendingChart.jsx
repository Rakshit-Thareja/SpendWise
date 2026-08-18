import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'

function SpendingChart({ expenses }) {
    const spendingByDate = {}

    expenses.forEach((expense) => {
        if (spendingByDate[expense.date]) {
            spendingByDate[expense.date] += expense.amount
        } else {
            spendingByDate[expense.date] = expense.amount
        }
    })

    const data = Object.entries(spendingByDate)
        .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
        .map(([date, amount]) => ({
            date,
            spending: amount,
        }))

    return (
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-white">
                    Spending Trend
                </h3>

                <p className="text-sm text-gray-400">
                    Your spending activity
                </p>
            </div>

            {data.length === 0 ? (
                <div className="flex h-72 items-center justify-center">
                    <p className="text-gray-400">
                        Add some expenses to see your spending trend.
                    </p>
                </div>
            ) : (
                <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#374151"
                            />

                            <XAxis
                                dataKey="date"
                                stroke="#9CA3AF"
                            />

                            <YAxis
                                stroke="#9CA3AF"
                            />

                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#111827',
                                    border: '1px solid #374151',
                                    borderRadius: '8px',
                                    color: '#fff',
                                }}
                                formatter={(value) => [
                                    `₹${value.toLocaleString('en-IN')}`,
                                    'Spending',
                                ]}
                            />

                            <Line
                                type="monotone"
                                dataKey="spending"
                                stroke="#6366F1"
                                strokeWidth={3}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    )
}

export default SpendingChart