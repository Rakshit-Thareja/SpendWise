function SummaryCard({ title, amount, change, icon }) {
    return (
        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5 transition duration-200 hover:-translate-y-0.5 hover:border-gray-700 hover:shadow-lg hover:shadow-black/20">

            <div className="flex items-start justify-between">

                <div>
                    <p className="text-sm font-medium text-gray-400">
                        {title}
                    </p>

                    <h3 className="mt-3 text-3xl font-bold tracking-tight text-white">
                        {amount}
                    </h3>

                    <p className="mt-2 text-sm text-gray-500">
                        {change}
                    </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-xl">
                    {icon}
                </div>

            </div>
        </div>
    )
}

export default SummaryCard