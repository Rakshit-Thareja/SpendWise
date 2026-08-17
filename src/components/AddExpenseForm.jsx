import { useState } from 'react'

function AddExpenseForm({ onAddExpense }) {
    const [formData, setFormData] = useState({
        amount: '',
        category: 'Food',
        description: '',
        date: '',
        paymentMethod: 'UPI',
    })

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (
            !formData.amount ||
            !formData.description ||
            !formData.date
        ) {
            return
        }

        const newExpense = {
            id: Date.now(),
            ...formData,
            amount: Number(formData.amount),
        }

        onAddExpense(newExpense)

        setFormData({
            amount: '',
            category: 'Food',
            description: '',
            date: '',
            paymentMethod: 'UPI',
        })
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-gray-800 bg-gray-900 p-6"
        >
            <h3 className="text-xl font-semibold text-white">
                Add Expense
            </h3>

            <p className="mt-1 text-sm text-gray-400">
                Record a new transaction.
            </p>

            <div className="mt-6 space-y-5">

                {/* Amount */}
                <div>
                    <label className="mb-2 block text-sm text-gray-300">
                        Amount
                    </label>

                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="₹ 0"
                        min="1"
                        className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="mb-2 block text-sm text-gray-300">
                        Category
                    </label>

                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
                    >
                        <option>Food</option>
                        <option>Transport</option>
                        <option>Shopping</option>
                        <option>Housing</option>
                        <option>Bills</option>
                        <option>Entertainment</option>
                        <option>Education</option>
                        <option>Health</option>
                        <option>Other</option>
                    </select>
                </div>

                {/* Description */}
                <div>
                    <label className="mb-2 block text-sm text-gray-300">
                        Description
                    </label>

                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="e.g. Lunch at college"
                        className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
                    />
                </div>

                {/* Date */}
                <div>
                    <label className="mb-2 block text-sm text-gray-300">
                        Date
                    </label>

                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
                    />
                </div>

                {/* Payment Method */}
                <div>
                    <label className="mb-2 block text-sm text-gray-300">
                        Payment Method
                    </label>

                    <select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
                    >
                        <option>UPI</option>
                        <option>Cash</option>
                        <option>Credit Card</option>
                        <option>Debit Card</option>
                        <option>Bank Transfer</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-500"
                >
                    Add Expense
                </button>

            </div>
        </form>
    )
}

export default AddExpenseForm