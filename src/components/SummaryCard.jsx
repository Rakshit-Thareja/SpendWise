function SummaryCard({ title, amount, change, icon }) {
    return (
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">
                    {title}
                </p>

                <span className="text-xl">
                    {icon}
                </span>
            </div>

            <h3 className="mt-3 text-2xl font-bold text-white">
                {amount}
            </h3>

            <p className="mt-2 text-sm text-green-400">
                {change}
            </p>
        </div>
    )
}

export default SummaryCard