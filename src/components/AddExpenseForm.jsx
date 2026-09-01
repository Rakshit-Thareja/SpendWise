import { useEffect, useState } from 'react'
import categories from '../constants/categories'

import Button from './Button'

function AddExpenseForm({
    onAddExpense,
    initialExpense = null,
    submitLabel = 'Add Expense',
    successMessage = '',
}) {
    const getToday = () => {
        return new Date().toISOString().split('T')[0]
    }

    const [error, setError] = useState('')
    const [saving, setSaving] = useState(false)

    const [formData, setFormData] = useState(
        initialExpense || {
            amount: '',
            category: 'Food',
            description: '',
            date: getToday(),
            paymentMethod: 'UPI',
        }
    )

    useEffect(() => {
        if (initialExpense) {
            setFormData(initialExpense)
        } else {
            setFormData({
                amount: '',
                category: 'Food',
                description: '',
                date: getToday(),
                paymentMethod: 'UPI',
            })
        }

        setError('')
    }, [initialExpense])

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }))

        setError('')
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (saving) {
            return
        }

        setError('')

        if (!formData.amount || Number(formData.amount) <= 0) {
            setError('Please enter a valid amount.')
            return
        }

        if (!formData.description.trim()) {
            setError('Please add a description.')
            return
        }

        if (!formData.date) {
            setError('Please select a date.')
            return
        }

        setSaving(true)

        const newExpense = {
            ...formData,
            id: initialExpense
                ? initialExpense.id
                : Date.now(),
            amount: Number(formData.amount),
            description: formData.description.trim(),
        }

        onAddExpense(newExpense)

        // Only reset the form when adding a NEW expense.
        // When editing, keep the updated values visible
        // until the parent switches back to Add Expense.
        if (!initialExpense) {
            setFormData({
                amount: '',
                category: 'Food',
                description: '',
                date: getToday(),
                paymentMethod: 'UPI',
            })
        }

        setSaving(false)
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-gray-800 bg-gray-900 p-6"
        >
            <h3 className="text-xl font-semibold text-white">
                {initialExpense ? 'Edit Expense' : 'Add Expense'}
            </h3>

            <p className="mt-1 text-sm text-gray-400">
                {initialExpense
                    ? 'Update your transaction details.'
                    : 'Record a new transaction.'}
            </p>

            <div className="mt-5 space-y-5">

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
                        {Object.keys(categories).map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
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

                {/* Error */}

                {error && (
                    <p className="text-sm text-red-400">
                        ⚠️ {error}
                    </p>
                )}

                {/* Success */}

                {successMessage && (
                    <p className="text-sm text-green-400">
                        ✅ {successMessage}
                    </p>
                )}

                {/* Submit Button */}

                <Button
                    type="submit"
                    disabled={saving}
                    className='w-full'
                >
                    {saving ? 'Saving...' : submitLabel}
                </Button>

            </div>
        </form>
    )
}

export default AddExpenseForm