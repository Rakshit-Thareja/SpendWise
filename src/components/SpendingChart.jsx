import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'

const data = [
    { day: 'Mon', spending: 1200 },
    { day: 'Tue', spending: 2100 },
    { day: 'Wed', spending: 1600 },
    { day: 'Thu', spending: 2800 },
    { day: 'Fri', spending: 2200 },
    { day: 'Sat', spending: 3500 },
    { day: 'Sun', spending: 1900 },
]

function SpendingChart() {
    return (
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-white">
                    Spending Trend
                </h3>

                <p className="text-sm text-gray-400">
                    Your spending over the last 7 days
                </p>
            </div>

            <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#374151"
                        />

                        <XAxis
                            dataKey="day"
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
        </div>
    )
}

export default SpendingChart