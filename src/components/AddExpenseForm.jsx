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

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (saving) {
            return
        }

        setError('')

        const amount = Number(formData.amount)
        const description = formData.description.trim()

        if (!formData.amount || !Number.isFinite(amount) || amount <= 0) {
            setError('Please enter an amount greater than ₹0.')
            return
        }

        if (amount > 10000000) {
            setError('Amount cannot exceed ₹1,00,00,000.')
            return
        }

        if (!description) {
            setError('Please add a description.')
            return
        }

        if (description.length < 2) {
            setError('Description must contain at least 2 characters.')
            return
        }

        if (description.length > 100) {
            setError('Description cannot exceed 100 characters.')
            return
        }

        if (!formData.category || !categories[formData.category]) {
            setError('Please select a valid category.')
            return
        }

        if (!formData.date) {
            setError('Please select a date.')
            return
        }

        const selectedDate = new Date(`${formData.date}T00:00:00`)
        const today = new Date()

        today.setHours(23, 59, 59, 999)

        if (Number.isNaN(selectedDate.getTime())) {
            setError('Please select a valid date.')
            return
        }

        if (selectedDate > today) {
            setError('Expense date cannot be in the future.')
            return
        }

        setSaving(true)

        const newExpense = {
            ...formData,
            id: initialExpense
                ? initialExpense.id
                : Date.now(),
            amount,
            description,
        }

        try {
            await onAddExpense(newExpense)
        } catch {
            setError('Unable to save this expense. Please try again.')
            return
        } finally {
            setSaving(false)
        }

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
