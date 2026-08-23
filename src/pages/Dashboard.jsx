import CategoryBreakdown from '../components/CategoryBreakdown'
import IncomeEditor from '../components/IncomeEditor'
import SummaryCard from '../components/SummaryCard'
import SpendingChart from '../components/SpendingChart'
import RecentTransactions from '../components/RecentTransactions'
import FinancialInsights from '../components/FinancialInsights'

function Dashboard({
    expenses,
    income,
    onIncomeChange,
}) {
    const totalExpenses = expenses.reduce(
        (total, expense) => total + expense.amount,
        0
    )

    const balance = income - totalExpenses

    const savings = balance

    return (
        <div className="space-y-8">

            {/* Header */}

            <div>
                <p className="text-sm font-medium text-indigo-400">
                    Financial Overview
                </p>

                <h2 className="mt-1 text-3xl font-bold tracking-tight text-white">
                    Welcome back 👋
                </h2>

                <p className="mt-2 text-gray-400">
                    Here's your financial overview.
                </p>
            </div>


            {/* Summary Cards */}

            <section>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                    <SummaryCard
                        title="Balance"
                        amount={`₹${balance.toLocaleString('en-IN')}`}
                        change="Current balance"
                        icon="💰"
                    />

                    <SummaryCard
                        title="Income"
                        amount={`₹${income.toLocaleString('en-IN')}`}
                        change="Monthly income"
                        icon="📈"
                    />

                    <SummaryCard
                        title="Expenses"
                        amount={`₹${totalExpenses.toLocaleString('en-IN')}`}
                        change="Total spending"
                        icon="📉"
                    />

                    <SummaryCard
                        title="Savings"
                        amount={`₹${savings.toLocaleString('en-IN')}`}
                        change="Available savings"
                        icon="💵"
                    />

                </div>
            </section>


            {/* Income Editor */}

            <section>
                <IncomeEditor
                    income={income}
                    onIncomeChange={onIncomeChange}
                />
            </section>


            {/* Charts */}

            <section>
                <div className="mb-4">
                    <h3 className="text-xl font-semibold text-white">
                        Spending Overview
                    </h3>

                    <p className="mt-1 text-sm text-gray-400">
                        Track where your money is going.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <SpendingChart expenses={expenses} />

                    <CategoryBreakdown expenses={expenses} />
                </div>
            </section>


            {/* Financial Insights */}

            <section>
                <FinancialInsights
                    expenses={expenses}
                    income={income}
                />
            </section>


            {/* Recent Transactions */}

            <section>
                <div className="mb-4">
                    <h3 className="text-xl font-semibold text-white">
                        Recent Transactions
                    </h3>

                    <p className="mt-1 text-sm text-gray-400">
                        Your latest spending activity.
                    </p>
                </div>

                <RecentTransactions expenses={expenses} />
            </section>

        </div>
    )
}

export default Dashboard