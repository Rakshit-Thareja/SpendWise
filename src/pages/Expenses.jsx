import { useState } from 'react'
import AddExpenseForm from '../components/AddExpenseForm'

function Expenses({
    expenses,
    onAddExpense,
    onDeleteExpense,
    onUpdateExpense,
}) {
    const [editingExpense, setEditingExpense] = useState(null)

    const [searchTerm, setSearchTerm] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('All')

    const filteredExpenses = expenses.filter((expense) => {
        const matchesSearch =
            expense.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase())

        const matchesCategory =
            categoryFilter === 'All' ||
            expense.category === categoryFilter

        return matchesSearch && matchesCategory
    })


    return (
        <div>
            <h2 className="text-3xl font-bold">
                Expenses
            </h2>

            <p className="mt-2 text-gray-400">
                Manage your expenses here.
            </p>

            <div className="mt-8 max-w-2xl">

                {editingExpense && (
                    <div className="mb-6">
                        <AddExpenseForm
                            initialExpense={editingExpense}
                            onAddExpense={(updatedExpense) => {
                                onUpdateExpense(updatedExpense)
                                setEditingExpense(null)
                            }}
                            submitLabel="Update Expense"
                        />
                    </div>
                )}

                {!editingExpense && (
                    <AddExpenseForm
                        onAddExpense={onAddExpense}
                    />
                )}
            </div>

            <div className="mt-8">
                <h3 className="text-xl font-semibold">
                    Your Expenses
                </h3>

                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <input
                        type="text"
                        placeholder="Search expenses..."
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none focus:border-indigo-500"
                    />

                    <select
                        value={categoryFilter}
                        onChange={(event) => setCategoryFilter(event.target.value)}
                        className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none focus:border-indigo-500"
                    >
                        <option value="All">All Categories</option>
                        <option value="Food">Food</option>
                        <option value="Transport">Transport</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Housing">Housing</option>
                        <option value="Bills">Bills</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Education">Education</option>
                        <option value="Health">Health</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="mt-4 space-y-3">
                    {filteredExpenses.length === 0 ? (
                        <p className="text-gray-400">
                            {expenses.length === 0
                                ? 'No expenses yet.'
                                : 'No expenses match your filters.'}
                        </p>
                    ) : (
                        filteredExpenses.map((expense) => (
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

                                <div className="flex items-center gap-2">
                                    <p className="font-semibold text-red-400">
                                        -₹{expense.amount.toLocaleString('en-IN')}
                                    </p>

                                    <button
                                        onClick={() => setEditingExpense(expense)}
                                        className="rounded-lg px-3 py-2 text-sm text-indigo-400 hover:bg-indigo-500/10"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => onDeleteExpense(expense.id)}
                                        className="rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-500/10"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default Expenses