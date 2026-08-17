import AddExpenseForm from '../components/AddExpenseForm'

function Expenses({ expenses, onAddExpense }) {
    return (
        <div>
            <h2 className="text-3xl font-bold">
                Expenses
            </h2>

            <p className="mt-2 text-gray-400">
                Manage your expenses here.
            </p>

            <div className="mt-8 max-w-2xl">
                <AddExpenseForm
                    onAddExpense={onAddExpense}
                />
            </div>

            <div className="mt-8">
                <h3 className="text-xl font-semibold">
                    Your Expenses
                </h3>

                <div className="mt-4 space-y-3">
                    {expenses.length === 0 ? (
                        <p className="text-gray-400">
                            No expenses yet.
                        </p>
                    ) : (
                        expenses.map((expense) => (
                            <div
                                key={expense.id}
                                className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-900 p-4"
                            >
                                <div>
                                    <p className="font-medium">
                                        {expense.description}
                                    </p>

                                    <p className="text-sm text-gray-400">
                                        {expense.category} • {expense.date}
                                    </p>
                                </div>

                                <p className="font-semibold text-red-400">
                                    -₹{expense.amount.toLocaleString('en-IN')}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default Expenses