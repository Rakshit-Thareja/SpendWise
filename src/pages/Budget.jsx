import BudgetForm from '../components/BudgetForm'

function Budget({
    expenses,
    budgets,
    onUpdateMonthlyBudget,
    onUpdateCategoryBudget,
}) {
    const totalExpenses = expenses.reduce(
        (total, expense) => total + expense.amount,
        0
    )

    const monthlyBudget = budgets.monthly

    const monthlyPercentage =
        monthlyBudget > 0
            ? Math.min(
                (totalExpenses / monthlyBudget) * 100,
                100
            )
            : 0

    const monthlyRemaining =
        monthlyBudget - totalExpenses

    const categorySpending = {}

    expenses.forEach((expense) => {
        if (categorySpending[expense.category]) {
            categorySpending[expense.category] += expense.amount
        } else {
            categorySpending[expense.category] = expense.amount
        }
    })

    return (
        <div>

            {/* Header */}

            <p className="text-sm font-medium text-indigo-400">
                Budget Management
            </p>

            <h2 className="mt-1 text-3xl font-bold tracking-tight text-white">
                Budget
            </h2>

            <p className="mt-2 text-gray-400">
                Set spending limits and keep your expenses on track.
            </p>


            {/* Summary Cards */}

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">

                {/* Monthly Budget */}

                <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5 transition hover:border-gray-700">
                    <p className="text-sm text-gray-400">
                        Monthly Budget
                    </p>

                    <p className="mt-2 text-3xl font-bold tracking-tight text-white">
                        ₹{monthlyBudget.toLocaleString('en-IN')}
                    </p>
                </div>


                {/* Total Spent */}

                <div className="rounded-xl border border-gray-800 bg-gray-900 p-5 transition hover:border-gray-700">
                    <p className="text-sm text-gray-400">
                        Total Spent
                    </p>

                    <p className="mt-2 text-2xl font-bold text-white">
                        ₹{totalExpenses.toLocaleString('en-IN')}
                    </p>
                </div>


                {/* Remaining */}

                <div className="rounded-xl border border-gray-800 bg-gray-900 p-5 transition hover:border-gray-700">
                    <p className="text-sm text-gray-400">
                        Remaining
                    </p>

                    <p
                        className={`mt-2 text-2xl font-bold tracking-tight ${
                            monthlyRemaining < 0
                                ? 'text-red-400'
                                : 'text-green-400'
                        }`}
                    >
                        ₹{Math.abs(monthlyRemaining).toLocaleString('en-IN')}
                    </p>
                </div>

            </div>


            {/* Budget Editor + Tips */}

            <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">

                {/* Budget Form */}

                <BudgetForm
                    budgets={budgets}
                    onUpdateMonthlyBudget={onUpdateMonthlyBudget}
                    onUpdateCategoryBudget={onUpdateCategoryBudget}
                />


                {/* Budget Tips */}

                <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">

                    <h3 className="text-xl font-semibold text-white">
                        Budget Tips
                    </h3>

                    <p className="mt-1 text-sm text-gray-400">
                        Helpful guidance based on your current spending.
                    </p>

                    <div className="mt-6 space-y-4">

                        {/* Budget Status */}

                        <div
                            className={`rounded-xl border p-4 ${
                                monthlyRemaining >= 0
                                    ? 'border-green-500/20 bg-green-500/5'
                                    : 'border-red-500/20 bg-red-500/5'
                            }`}
                        >
                            <p
                                className={`text-sm font-medium ${
                                    monthlyRemaining >= 0
                                        ? 'text-green-400'
                                        : 'text-red-400'
                                }`}
                            >
                                {monthlyRemaining >= 0
                                    ? '✅ Budget is on track'
                                    : '⚠️ Budget exceeded'}
                            </p>

                            <p className="mt-2 text-sm leading-6 text-gray-400">
                                {monthlyRemaining >= 0
                                    ? `You have ₹${monthlyRemaining.toLocaleString(
                                        'en-IN'
                                    )} remaining from your monthly budget.`
                                    : `You are ₹${Math.abs(
                                        monthlyRemaining
                                    ).toLocaleString(
                                        'en-IN'
                                    )} over your monthly budget.`}
                            </p>
                        </div>


                        {/* Budget Usage */}

                        <div className="rounded-xl bg-gray-950 p-4">

                            <p className="text-sm text-gray-500">
                                Budget Usage
                            </p>

                            <p className="mt-1 text-2xl font-bold text-white">
                                {monthlyPercentage.toFixed(0)}%
                            </p>

                            <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-800">
                                <div
                                    className={`h-full rounded-full transition-all duration-500 ${
                                        monthlyPercentage >= 90
                                            ? 'bg-red-500'
                                            : monthlyPercentage >= 80
                                                ? 'bg-yellow-500'
                                                : 'bg-indigo-500'
                                    }`}
                                    style={{
                                        width: `${monthlyPercentage}%`,
                                    }}
                                />
                            </div>

                            <p className="mt-2 text-sm text-gray-500">
                                of your monthly budget used
                            </p>

                        </div>


                        {/* Recommendation */}

                        <div className="rounded-xl bg-gray-950 p-4">

                            <p className="text-sm text-gray-500">
                                Recommendation
                            </p>

                            <p className="mt-2 text-sm leading-6 text-gray-300">

                                {monthlyPercentage >= 90
                                    ? 'Consider reducing non-essential spending for the rest of the month.'
                                    : monthlyPercentage >= 80
                                        ? 'You are approaching your limit. Keep your spending under control.'
                                        : monthlyPercentage >= 50
                                            ? 'Your spending is progressing steadily. Keep monitoring your expenses.'
                                            : 'You are well within your budget. Keep up the good work!'}

                            </p>

                        </div>

                    </div>

                </div>

            </div>


            {/* Monthly Budget */}

            <div className="mt-8 rounded-2xl border border-gray-800 bg-gray-900 p-6">

                <div>
                    <h3 className="text-xl font-semibold text-white">
                        Monthly Budget
                    </h3>

                    <p className="mt-1 text-sm text-gray-400">
                        Track your spending against your monthly limit.
                    </p>
                </div>

                <div className="mt-5 flex items-end justify-between">

                    <div>
                        <p className="text-2xl font-bold text-white">
                            ₹{totalExpenses.toLocaleString('en-IN')}
                        </p>

                        <p className="text-sm text-gray-400">
                            of ₹{monthlyBudget.toLocaleString('en-IN')}
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="text-2xl font-bold text-white">
                            {monthlyPercentage.toFixed(0)}%
                        </p>

                        <p className="text-xs text-gray-500">
                            used
                        </p>
                    </div>

                </div>

                <div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-800">
                    <div
                        className={`h-full rounded-full transition-all duration-500 ${
                            monthlyPercentage >= 90
                                ? 'bg-red-500'
                                : monthlyPercentage >= 80
                                    ? 'bg-yellow-500'
                                    : 'bg-indigo-500'
                        }`}
                        style={{
                            width: `${monthlyPercentage}%`,
                        }}
                    />
                </div>

                <div className="mt-4 flex items-center justify-between">

                    <p
                        className={`text-sm font-medium ${
                            monthlyRemaining >= 0
                                ? 'text-green-400'
                                : 'text-red-400'
                        }`}
                    >
                        {monthlyRemaining >= 0
                            ? `₹${monthlyRemaining.toLocaleString(
                                'en-IN'
                            )} remaining`
                            : `₹${Math.abs(
                                monthlyRemaining
                            ).toLocaleString(
                                'en-IN'
                            )} over budget`}
                    </p>

                    <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                            monthlyRemaining >= 0
                                ? 'bg-green-500/10 text-green-400'
                                : 'bg-red-500/10 text-red-400'
                        }`}
                    >
                        {monthlyRemaining >= 0
                            ? 'On Track'
                            : 'Over Budget'}
                    </span>

                </div>

                {monthlyPercentage >= 80 && (
                    <p
                        className={`mt-3 text-sm font-medium ${
                            monthlyPercentage >= 90
                                ? 'text-red-400'
                                : 'text-yellow-400'
                        }`}
                    >
                        {monthlyPercentage >= 90
                            ? '⚠️ You are very close to your monthly budget.'
                            : '⚠️ You are approaching your monthly budget.'}
                    </p>
                )}

            </div>


            {/* Category Budgets */}

            <div className="mt-6">

                <div>
                    <h3 className="text-xl font-semibold text-white">
                        Category Budgets
                    </h3>

                    <p className="mt-1 text-sm text-gray-400">
                        Keep track of spending limits for each category.
                    </p>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">

                    {Object.entries(budgets.categories).map(
                        ([category, budgetAmount]) => {

                            const spent =
                                categorySpending[category] || 0

                            const percentage =
                                budgetAmount > 0
                                    ? Math.min(
                                        (spent / budgetAmount) * 100,
                                        100
                                    )
                                    : 0

                            const remaining =
                                budgetAmount - spent

                            return (
                                <div
                                    key={category}
                                    className="rounded-2xl border border-gray-800 bg-gray-900 p-5 transition hover:-translate-y-0.5 hover:border-gray-700 hover:shadow-lg hover:shadow-black/20"
                                >

                                    <div className="flex items-center justify-between">

                                        <h4 className="font-semibold text-white">
                                            {category}
                                        </h4>

                                        <span className="rounded-full bg-gray-800 px-2.5 py-1 text-xs font-medium text-gray-300">
                                            {percentage.toFixed(0)}%
                                        </span>

                                    </div>

                                    <div className="mt-4 flex justify-between text-sm">

                                        <span className="font-medium text-white">
                                            ₹{spent.toLocaleString('en-IN')}
                                        </span>

                                        <span className="text-gray-500">
                                            of ₹{budgetAmount.toLocaleString('en-IN')}
                                        </span>

                                    </div>

                                    <div className="mt-3 h-3 overflow-hidden rounded-full bg-gray-800">

                                        <div
                                            className={`h-full rounded-full ${
                                                percentage >= 90
                                                    ? 'bg-red-500'
                                                    : percentage >= 80
                                                        ? 'bg-yellow-500'
                                                        : 'bg-indigo-500'
                                            }`}
                                            style={{
                                                width: `${percentage}%`,
                                            }}
                                        />

                                    </div>

                                    <p className="mt-3 text-sm text-gray-400">
                                        {remaining >= 0
                                            ? `₹${remaining.toLocaleString(
                                                'en-IN'
                                            )} remaining`
                                            : `₹${Math.abs(
                                                remaining
                                            ).toLocaleString(
                                                'en-IN'
                                            )} over budget`}
                                    </p>

                                    {percentage >= 80 && (
                                        <p
                                            className={`mt-2 text-sm font-medium ${
                                                percentage >= 90
                                                    ? 'text-red-400'
                                                    : 'text-yellow-400'
                                            }`}
                                        >
                                            {percentage >= 90
                                                ? '⚠️ Budget almost exceeded'
                                                : '⚠️ Approaching budget'}
                                        </p>
                                    )}

                                </div>
                            )
                        }
                    )}

                </div>

            </div>

        </div>
    )
}

export default Budget