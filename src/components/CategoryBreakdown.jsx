import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'

function CategoryBreakdown({ expenses }) {
    const categoryTotals = {}

    expenses.forEach((expense) => {
        if (categoryTotals[expense.category]) {
            categoryTotals[expense.category] += expense.amount
        } else {
            categoryTotals[expense.category] = expense.amount
        }
    })

    const data = Object.entries(categoryTotals).map(
        ([category, amount]) => ({
            category,
            amount,
        })
    )

    return (
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-white">
                    Category Breakdown
                </h3>

                <p className="text-sm text-gray-400">
                    Where your money is going
                </p>
            </div>

            {data.length === 0 ? (
                <div className="flex h-72 items-center justify-center">
                    <p className="text-gray-400">
                        Add expenses to see your spending breakdown.
                    </p>
                </div>
            ) : (
                <>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    dataKey="amount"
                                    nameKey="category"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={90}
                                    innerRadius={55}
                                >
                                    {data.map((entry, index) => (
                                        <Cell
                                            key={`cell-${entry.category}`}
                                            fill={`hsl(${index * 45}, 70%, 55%)`}
                                        />
                                    ))}
                                </Pie>

                                <Tooltip
                                    formatter={(value) =>
                                        `₹${value.toLocaleString('en-IN')}`
                                    }
                                    contentStyle={{
                                        backgroundColor: '#111827',
                                        border: '1px solid #374151',
                                        borderRadius: '8px',
                                        color: '#fff',
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="mt-4 space-y-3">
                        {data.map((item) => (
                            <div
                                key={item.category}
                                className="flex items-center justify-between"
                            >
                                <span className="text-sm text-gray-300">
                                    {item.category}
                                </span>

                                <span className="font-medium text-white">
                                    ₹{item.amount.toLocaleString('en-IN')}
                                </span>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default CategoryBreakdown