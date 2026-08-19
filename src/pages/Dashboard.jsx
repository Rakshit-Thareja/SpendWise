import CategoryBreakdown from '../components/CategoryBreakdown'
import IncomeEditor from '../components/IncomeEditor'
import SummaryCard from '../components/SummaryCard'
import SpendingChart from '../components/SpendingChart'
import RecentTransactions from '../components/RecentTransactions'

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

                <IncomeEditor
                    income={income}
                    onIncomeChange={onIncomeChange}
                />

            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
                <SpendingChart expenses={expenses} />

                <CategoryBreakdown expenses={expenses} />
            </div>

            <RecentTransactions expenses={expenses} />
        </div>
    )
}

export default Dashboard