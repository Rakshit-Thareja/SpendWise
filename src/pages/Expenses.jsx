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
            <p className="text-sm font-medium text-indigo-400">
                Expense Management
            </p>

            <h2 className="mt-1 text-3xl font-bold tracking-tight text-white">
                Expenses
            </h2>

            <p className="mt-2 text-gray-400">
                Track, manage, and review your spending.
            </p>

            <div className="mt-10 max-w-2xl">

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

                <p className="mt-1 text-sm text-gray-400">
                    Search and filter your transactions.
                </p>

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
                <p className="mt-3 text-sm text-gray-500">
                    Showing {filteredExpenses.length} expenses
                </p>
                <div className="mt-4 space-y-3">
                    {filteredExpenses.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-gray-700 bg-gray-900/50 p-8 text-center">
                            <div className="text-4xl">
                                {expenses.length === 0 ? '💸' : '🔍'}
                            </div>

                            <h4 className="mt-3 font-semibold text-white">
                                {expenses.length === 0
                                    ? 'No expenses yet'
                                    : 'No matching expenses'}
                            </h4>

                            <p className="mt-1 text-sm text-gray-400">
                                {expenses.length === 0
                                    ? 'Add your first expense to start tracking your spending.'
                                    : 'Try changing your search or category filter.'}
                            </p>
                        </div>
                    ) : (
                        filteredExpenses.map((expense) => (

                            <div
                                key={expense.id}
                                className="flex flex-col gap-4 rounded-xl border border-gray-800 bg-gray-900 p-4 transition hover:border-gray-700 sm:flex-row sm:items-center sm:justify-between"
                            >

                                <div className="flex items-center gap-3">

                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-800 text-lg">
                                        {expense.category === 'Food' && '🍔'}
                                        {expense.category === 'Transport' && '🚗'}
                                        {expense.category === 'Shopping' && '🛍️'}
                                        {expense.category === 'Housing' && '🏠'}
                                        {expense.category === 'Bills' && '🧾'}
                                        {expense.category === 'Entertainment' && '🎮'}
                                        {expense.category === 'Education' && '📚'}
                                        {expense.category === 'Health' && '❤️'}
                                        {expense.category === 'Other' && '📦'}
                                    </div>

                                    <div>
                                        <p className="font-medium text-white">
                                            {expense.description}
                                        </p>

                                        <p className="mt-1 text-sm text-gray-400">
                                            {expense.category} • {expense.date}
                                        </p>
                                    </div>

                                </div>

                                <div className="flex items-center gap-2 sm:justify-end">

                                    <p className="mr-2 font-semibold text-red-400">
                                        -₹{expense.amount.toLocaleString('en-IN')}
                                    </p>

                                    <button
                                        onClick={() => setEditingExpense(expense)}
                                        className="rounded-lg px-3 py-2 text-sm text-indigo-400 transition hover:bg-indigo-500/10"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => onDeleteExpense(expense.id)}
                                        className="rounded-lg px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
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