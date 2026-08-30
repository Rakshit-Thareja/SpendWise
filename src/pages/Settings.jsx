import { useState } from 'react'

import Button from '../components/Button'

function Settings({
    expenses,
    income,
    budgets,
    onResetData,
    onRestoreData,
}) {
    const [importMessage, setImportMessage] = useState({
        text: '',
        type: '',
    })

    const [showResetConfirm, setShowResetConfirm] = useState(false)

    const handleExport = () => {
        const backupData = {
            expenses,
            income,
            budgets,
        }

        const data = JSON.stringify(backupData, null, 2)

        const blob = new Blob([data], {
            type: 'application/json',
        })

        const url = URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = url
        link.download = 'spendwise-backup.json'

        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        URL.revokeObjectURL(url)
    }

    const handleImport = (event) => {
        setImportMessage({
            text: '',
            type: '',
        })

        const file = event.target.files[0]

        if (!file) {
            return
        }

        const reader = new FileReader()

        reader.onload = (event) => {
            try {
                const backupData = JSON.parse(event.target.result)

                // Validate expenses
                if (!Array.isArray(backupData.expenses)) {
                    throw new Error('Invalid expenses data')
                }

                // Validate income
                if (!Number.isFinite(backupData.income)) {
                    throw new Error('Invalid income data')
                }

                // Validate budgets
                if (
                    backupData.budgets === null ||
                    typeof backupData.budgets !== 'object' ||
                    Array.isArray(backupData.budgets)
                ) {
                    throw new Error('Invalid budget data')
                }

                // Restore the backup
                onRestoreData(backupData)

                setImportMessage({
                    text: 'Data imported successfully.',
                    type: 'success',
                })

                // Hide success message after 3 seconds
                setTimeout(() => {
                    setImportMessage({
                        text: '',
                        type: '',
                    })
                }, 3000)
            } catch (error) {
                setImportMessage({
                    text: 'Invalid SpendWise backup file.',
                    type: 'error',
                })

                console.error('Invalid backup file:', error)
            }
        }

        reader.onerror = () => {
            setImportMessage({
                text: 'Failed to read the backup file.',
                type: 'error',
            })
        }

        reader.readAsText(file)

        // Allows the same file to be selected again
        event.target.value = ''
    }

    return (
        <div>

            {/* Header */}

            <p className="text-sm font-medium text-indigo-400">
                App Settings
            </p>

            <h2 className="mt-1 text-3xl font-bold tracking-tight text-white">
                Settings
            </h2>

            <p className="mt-2 text-gray-400">
                Manage your SpendWise preferences and data.
            </p>


            {/* Data Management */}

            <div className="mt-10 max-w-2xl rounded-2xl border border-gray-800 bg-gray-900 p-6">

                <h3 className="text-xl font-semibold text-white">
                    🗄️ Data Management
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                    Your SpendWise data is stored locally in this browser.
                </p>


                {/* Data Summary */}

                <div className="mt-6 space-y-4">

                    <div className="flex items-center justify-between rounded-lg bg-gray-950 px-4 py-3">
                        <span className="text-sm text-gray-400">
                            Expenses
                        </span>

                        <span className="font-semibold text-white">
                            {expenses.length}
                        </span>
                    </div>

                    <div className="flex items-center justify-between rounded-lg bg-gray-950 px-4 py-3">
                        <span className="text-sm text-gray-400">
                            Monthly Income
                        </span>

                        <span className="font-semibold text-white">
                            ₹{income.toLocaleString('en-IN')}
                        </span>
                    </div>

                </div>


                {/* Import / Export */}

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">

                    <label className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-gray-700 px-4 py-3 font-semibold text-gray-200 transition hover:bg-gray-800">

                        Import Data

                        <input
                            type="file"
                            accept=".json,application/json"
                            onChange={handleImport}
                            className="hidden"
                        />

                    </label>

                    <Button
                        variant="secondary"
                        onClick={handleExport}
                    >
                        Export Data
                    </Button>

                </div>


                {/* Import Message */}

                {importMessage.text && (
                    <p
                        className={`mt-3 text-sm ${importMessage.type === 'success'
                            ? 'text-green-400'
                            : 'text-red-400'
                            }`}
                    >
                        {importMessage.type === 'success'
                            ? '✅'
                            : '⚠️'}{' '}
                        {importMessage.text}
                    </p>
                )}


                {/* Reset */}

                <Button
                    variant="danger"
                    onClick={() => setShowResetConfirm(true)}
                    className="mt-6"
                >
                    Reset All Data
                </Button>

            </div>


            {/* Reset Confirmation Modal */}

            {showResetConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">

                    <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-2xl">

                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-2xl">
                            ⚠️
                        </div>

                        <h3 className="mt-4 text-xl font-semibold text-white">
                            Reset All Data?
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-gray-400">
                            This will permanently remove your expenses,
                            income, and budgets from this browser.
                        </p>

                        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                            <Button
                                variant="secondary"
                                onClick={() => setShowResetConfirm(false)}
                            >
                                Cancel
                            </Button>

                            <Button
                                variant="danger"
                                onClick={() => {
                                    onResetData()
                                    setShowResetConfirm(false)
                                }}
                            >
                                Reset Data
                            </Button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    )
}

export default Settings