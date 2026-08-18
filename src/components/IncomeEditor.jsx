import { useState } from 'react'

function IncomeEditor({ income, onIncomeChange }) {
    const [isEditing, setIsEditing] = useState(false)
    const [value, setValue] = useState(income)

    const handleSave = () => {
        if (!value || Number(value) <= 0) {
            return
        }

        onIncomeChange(Number(value))
        setIsEditing(false)
    }

    return (
        <div className="mt-6 rounded-xl border border-gray-800 bg-gray-900 p-5">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-white">
                        Monthly Income
                    </h3>

                    <p className="mt-1 text-2xl font-bold text-white">
                        ₹{income.toLocaleString('en-IN')}
                    </p>
                </div>

                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
                    >
                        Edit Income
                    </button>
                )}
            </div>

            {isEditing && (
                <div className="mt-5 flex gap-3">
                    <input
                        type="number"
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                        className="flex-1 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white outline-none focus:border-indigo-500"
                    />

                    <button
                        onClick={handleSave}
                        className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-500"
                    >
                        Save
                    </button>

                    <button
                        onClick={() => setIsEditing(false)}
                        className="rounded-lg bg-gray-700 px-4 py-2 font-medium text-white hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    )
}

export default IncomeEditor