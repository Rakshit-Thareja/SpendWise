import { useState } from 'react'

const categories = [
    'Food',
    'Transport',
    'Shopping',
    'Housing',
    'Bills',
    'Entertainment',
    'Education',
    'Health',
    'Other',
]

function BudgetForm({
    budgets,
    onUpdateMonthlyBudget,
    onUpdateCategoryBudget,
}) {
    const [monthlyBudget, setMonthlyBudget] = useState(
        budgets.monthly
    )

    const [category, setCategory] = useState('Food')

    const [categoryAmount, setCategoryAmount] = useState(
        budgets.categories.Food || ''
    )

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value

        setCategory(selectedCategory)

        setCategoryAmount(
            budgets.categories[selectedCategory] || ''
        )
    }

    const handleMonthlySubmit = (event) => {
        event.preventDefault()

        if (!monthlyBudget || Number(monthlyBudget) <= 0) {
            return
        }

        onUpdateMonthlyBudget(Number(monthlyBudget))
    }

    const handleCategorySubmit = (event) => {
        event.preventDefault()

        if (!categoryAmount || Number(categoryAmount) <= 0) {
            return
        }

        onUpdateCategoryBudget(
            category,
            Number(categoryAmount)
        )
    }

    return (
        <div className="space-y-6">

            {/* Monthly Budget */}

            <form
                onSubmit={handleMonthlySubmit}
                className="rounded-xl border border-gray-800 bg-gray-900 p-6"
            >
                <h3 className="text-xl font-semibold text-white">
                    Monthly Budget
                </h3>

                <p className="mt-1 text-sm text-gray-400">
                    Set the maximum amount you want to spend each month.
                </p>

                <div className="mt-5 flex gap-3">
                    <input
                        type="number"
                        min="1"
                        value={monthlyBudget}
                        onChange={(event) =>
                            setMonthlyBudget(event.target.value)
                        }
                        className="flex-1 rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
                    />

                    <button
                        type="submit"
                        className="rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-500"
                    >
                        Save
                    </button>
                </div>
            </form>

            {/* Category Budget */}

            <form
                onSubmit={handleCategorySubmit}
                className="rounded-xl border border-gray-800 bg-gray-900 p-6"
            >
                <h3 className="text-xl font-semibold text-white">
                    Category Budget
                </h3>

                <p className="mt-1 text-sm text-gray-400">
                    Set a spending limit for a specific category.
                </p>

                <div className="mt-5 space-y-4">

                    <select
                        value={category}
                        onChange={handleCategoryChange}
                        className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
                    >
                        {categories.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>

                    <input
                        type="number"
                        min="1"
                        placeholder="Budget amount"
                        value={categoryAmount}
                        onChange={(event) =>
                            setCategoryAmount(event.target.value)
                        }
                        className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
                    />

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-500"
                    >
                        Save Category Budget
                    </button>

                </div>
            </form>

        </div>
    )
}

export default BudgetForm