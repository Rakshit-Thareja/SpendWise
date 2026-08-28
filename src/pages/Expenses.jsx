import { useEffect, useRef, useState } from 'react'
import AddExpenseForm from '../components/AddExpenseForm'
import categories from '../constants/categories'

function Expenses({
    expenses,
    onAddExpense,
    onDeleteExpense,
    onUpdateExpense,
}) {
    const [successMessage, setSuccessMessage] = useState('')
    const [editingExpense, setEditingExpense] = useState(null)

    const [searchTerm, setSearchTerm] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('All')

    const successTimeoutRef = useRef(null)

    const [expenseToDelete, setExpenseToDelete] = useState(null)

    useEffect(() => {
        if (!expenseToDelete) {
            return
        }

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setExpenseToDelete(null)
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [expenseToDelete])

    const confirmDelete = () => {
        if (expenseToDelete) {
            onDeleteExpense(expenseToDelete.id)
            showSuccessMessage("Expense deleted Successfully")
            setExpenseToDelete(null)
        }
    }

    useEffect(() => {
        return () => {
            if (successTimeoutRef.current) {
                clearTimeout(successTimeoutRef.current)
            }
        }
    }, [])

    const clearSuccessTimeout = () => {
        if (successTimeoutRef.current) {
            clearTimeout(successTimeoutRef.current)
            successTimeoutRef.current = null
        }
    }

    const showSuccessMessage = (message, onComplete) => {
        clearSuccessTimeout()

        setSuccessMessage(message)

        successTimeoutRef.current = setTimeout(() => {
            setSuccessMessage('')
            successTimeoutRef.current = null

            if (onComplete) {
                onComplete()
            }
        }, 3000)
    }

    const startEditing = (expense) => {
        clearSuccessTimeout()
        setSuccessMessage('')
        setExpenseToDelete(null)
        setEditingExpense(expense)
    }

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

            {/* Header */}

            <p className="text-sm font-medium text-indigo-400">
                Expense Management
            </p>

            <h2 className="mt-1 text-3xl font-bold tracking-tight text-white">
                Expenses
            </h2>

            <p className="mt-2 text-gray-400">
                Track, manage, and review your spending.
            </p>

            {/* Expense Form */}

            <div className="mt-10 max-w-2xl">

                {editingExpense && (
                    <div className="mb-6">
                        <AddExpenseForm
                            initialExpense={editingExpense}
                            successMessage={successMessage}
                            onAddExpense={(updatedExpense) => {
                                onUpdateExpense(updatedExpense)

                                showSuccessMessage(
                                    'Expense updated successfully.',
                                    () => {
                                        setEditingExpense(null)
                                    }
                                )
                            }}
                            submitLabel="Update Expense"
                        />
                    </div>
                )}

                {!editingExpense && (
                    <AddExpenseForm
                        successMessage={successMessage}
                        onAddExpense={(newExpense) => {
                            onAddExpense(newExpense)

                            showSuccessMessage(
                                'Expense added successfully.'
                            )
                        }}
                    />
                )}

            </div>

            {/* Expenses */}

            <div className="mt-8">

                <h3 className="text-xl font-semibold text-white">
                    Your Expenses
                </h3>

                <p className="mt-1 text-sm text-gray-400">
                    Search and filter your transactions.
                </p>

                {/* Search & Filter */}

                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">

                    <input
                        type="text"
                        placeholder="Search expenses..."
                        value={searchTerm}
                        onChange={(event) =>
                            setSearchTerm(event.target.value)
                        }
                        className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none focus:border-indigo-500"
                    />

                    <select
                        value={categoryFilter}
                        onChange={(event) =>
                            setCategoryFilter(event.target.value)
                        }
                        className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none focus:border-indigo-500"
                    >
                        <option value="All">All Categories</option>

                        {Object.keys(categories).map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>

                </div>

                {/* Result Count */}

                <p className="mt-3 text-sm text-gray-500">
                    Showing {filteredExpenses.length} expenses
                </p>

                {/* Expense List */}

                <div className="mt-4 space-y-3">

                    {filteredExpenses.length === 0 ? (

                        <div className="rounded-xl border border-dashed border-gray-700 bg-gray-900/50 p-8 text-center">

                            <div className="text-4xl">
                                {expenses.length === 0
                                    ? '💸'
                                    : '🔍'}
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

                                {/* Expense Information */}

                                <div className="flex items-center gap-3">

                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-800 text-lg">
                                        {categories[expense.category] || '📦'}
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

                                {/* Amount & Actions */}

                                <div className="flex items-center gap-2 sm:justify-end">

                                    <p className="mr-2 font-semibold text-red-400">
                                        -₹{expense.amount.toLocaleString('en-IN')}
                                    </p>

                                    <button
                                        onClick={() =>
                                            startEditing(expense)
                                        }
                                        className="rounded-lg px-3 py-2 text-sm text-indigo-400 transition hover:bg-indigo-500/10"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => {
                                            setExpenseToDelete(expense)
                                        }}
                                        className="rounded-lg px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
                                    >
                                        Delete
                                    </button>

                                </div>
                                {expenseToDelete && (
                                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                                        <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-2xl">

                                            {/* Icon */}

                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-2xl">
                                                ⚠️
                                            </div>

                                            {/* Content */}

                                            <h3 className="mt-4 text-xl font-semibold text-white">
                                                Delete Expense?
                                            </h3>

                                            <p className="mt-2 text-sm leading-6 text-gray-400">
                                                This action cannot be undone. Are you sure you want to
                                                permanently delete this expense?
                                            </p>

                                            {/* Expense */}

                                            <div className="mt-4 rounded-xl border border-gray-800 bg-gray-950 p-4">
                                                <p className="font-medium text-white">
                                                    {expenseToDelete.description}
                                                </p>

                                                <div className="mt-1 flex items-center justify-between">
                                                    <p className="text-sm text-gray-500">
                                                        {expenseToDelete.category}
                                                    </p>

                                                    <p className="font-semibold text-red-400">
                                                        -₹{expenseToDelete.amount.toLocaleString('en-IN')}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Actions */}

                                            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                                                <button
                                                    type="button"
                                                    onClick={() => setExpenseToDelete(null)}
                                                    className="rounded-lg border border-gray-700 px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-gray-800"
                                                >
                                                    Cancel
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={confirmDelete}
                                                    className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-500"
                                                >
                                                    Delete Expense
                                                </button>

                                            </div>

                                        </div>
                                    </div>
                                )}
                            </div>

                        ))
                    )}

                </div>
            </div>

        </div>
    )
}

export default Expenses