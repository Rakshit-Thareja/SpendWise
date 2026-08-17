import SummaryCard from '../components/SummaryCard'
import SpendingChart from '../components/SpendingChart'
import RecentTransactions from '../components/RecentTransactions'


function Dashboard() {
    return (
        <div>
            <h2 className="text-3xl font-bold">
                Welcome back 👋
            </h2>

            <p className="mt-2 text-gray-400">
                Here's your financial overview.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                <SummaryCard
                    title="Balance"
                    amount="₹32,450"
                    change="+12.5% from last month"
                    icon="💰"
                />

                <SummaryCard
                    title="Income"
                    amount="₹50,000"
                    change="+8.2% from last month"
                    icon="📈"
                />

                <SummaryCard
                    title="Expenses"
                    amount="₹17,550"
                    change="-4.3% from last month"
                    icon="📉"
                />

                <SummaryCard
                    title="Savings"
                    amount="₹32,450"
                    change="+15.2% from last month"
                    icon="💵"
                />

                <div className="mt-6">
                    <SpendingChart />
                </div>

                <RecentTransactions />
            </div>
        </div>
    )
}

export default Dashboard