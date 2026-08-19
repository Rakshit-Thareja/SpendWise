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
            <h2 className="text-3xl font-bold">
                Budget
            </h2>

            <p className="mt-2 text-gray-400">
                Set and manage your spending limits.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
                    <p className="text-sm text-gray-400">
                        Monthly Budget
                    </p>

                    <p className="mt-2 text-2xl font-bold">
                        ₹{monthlyBudget.toLocaleString('en-IN')}
                    </p>
                </div>

                <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
                    <p className="text-sm text-gray-400">
                        Total Spent
                    </p>

                    <p className="mt-2 text-2xl font-bold">
                        ₹{totalExpenses.toLocaleString('en-IN')}
                    </p>
                </div>

                <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
                    <p className="text-sm text-gray-400">
                        Remaining
                    </p>

                    <p
                        className={`mt-2 text-2xl font-bold ${monthlyRemaining < 0
                                ? 'text-red-400'
                                : 'text-green-400'
                            }`}
                    >
                        ₹{Math.abs(monthlyRemaining).toLocaleString('en-IN')}
                    </p>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
                <BudgetForm
                    budgets={budgets}
                    onUpdateMonthlyBudget={onUpdateMonthlyBudget}
                    onUpdateCategoryBudget={onUpdateCategoryBudget}
                />
            </div>

            {/* Monthly Budget */}

            <div className="mt-8 rounded-xl border border-gray-800 bg-gray-900 p-6">
                <h3 className="text-xl font-semibold">
                    Monthly Budget
                </h3>

                <div className="mt-5 flex items-end justify-between">
                    <div>
                        <p className="text-2xl font-bold">
                            ₹{totalExpenses.toLocaleString('en-IN')}
                        </p>

                        <p className="text-sm text-gray-400">
                            of ₹{monthlyBudget.toLocaleString('en-IN')}
                        </p>
                    </div>

                    <p className="text-sm text-gray-400">
                        {monthlyPercentage.toFixed(0)}% used
                    </p>
                </div>

                <div className="mt-4 h-3 overflow-hidden rounded-full bg-gray-800">
                    <div
                        className={`h-full rounded-full ${monthlyPercentage >= 90
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

                <p className="mt-3 text-sm text-gray-400">
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

                {monthlyPercentage >= 80 && (
                    <p
                        className={`mt-3 text-sm font-medium ${monthlyPercentage >= 90
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
                <h3 className="text-xl font-semibold">
                    Category Budgets
                </h3>

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
                                    className="rounded-xl border border-gray-800 bg-gray-900 p-5"
                                >
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-semibold">
                                            {category}
                                        </h4>

                                        <span className="text-sm text-gray-400">
                                            {percentage.toFixed(0)}%
                                        </span>
                                    </div>

                                    <div className="mt-3 flex justify-between text-sm">
                                        <span>
                                            ₹{spent.toLocaleString('en-IN')}
                                        </span>

                                        <span className="text-gray-400">
                                            ₹{budgetAmount.toLocaleString(
                                                'en-IN'
                                            )}
                                        </span>
                                    </div>

                                    <div className="mt-3 h-3 overflow-hidden rounded-full bg-gray-800">
                                        <div
                                            className={`h-full rounded-full ${percentage >= 90
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
                                            className={`mt-2 text-sm font-medium ${percentage >= 90
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