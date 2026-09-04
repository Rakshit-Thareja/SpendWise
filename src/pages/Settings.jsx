import { useEffect, useState } from 'react'

import Button from '../components/Button'
import LogoutButton from '../components/LogoutButton'
import { useAuth } from '../context/AuthContext'
import { saveUserData } from '../firebase/firestore'

function Settings({
    expenses,
    income,
    budgets,
    onResetData,
    onRestoreData,
}) {
    const { user, displayName, updateUserDisplayName } = useAuth()

    const [name, setName] = useState(displayName || user?.displayName || '')
    const [nameMessage, setNameMessage] = useState({
        text: '',
        type: '',
    })
    const [savingName, setSavingName] = useState(false)

    const [importMessage, setImportMessage] = useState({
        text: '',
        type: '',
    })

    const [showResetConfirm, setShowResetConfirm] = useState(false)
    const [resetting, setResetting] = useState(false)

    useEffect(() => {
        setName(displayName || user?.displayName || '')
    }, [displayName, user])

    const handleSaveName = async (event) => {
        event.preventDefault()

        const trimmedName = name.trim()

        if (!trimmedName) {
            setNameMessage({
                text: 'Please enter your name.',
                type: 'error',
            })
            return
        }

        if (!user) {
            return
        }

        setSavingName(true)
        setNameMessage({
            text: '',
            type: '',
        })

        try {
            await updateUserDisplayName(trimmedName)

            await saveUserData(user.uid, {
                displayName: trimmedName,
            })

            setName(trimmedName)

            setNameMessage({
                text: 'Name updated successfully.',
                type: 'success',
            })

            setTimeout(() => {
                setNameMessage({
                    text: '',
                    type: '',
                })
            }, 3000)
        } catch (error) {
            console.error('Failed to update name:', error)

            setNameMessage({
                text: 'Failed to update your name. Please try again.',
                type: 'error',
            })
        } finally {
            setSavingName(false)
        }
    }

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

    const handleReset = async () => {
        if (resetting) {
            return
        }

        setResetting(true)

        try {
            await onResetData()
            setShowResetConfirm(false)
        } catch (error) {
            console.error('Failed to reset data:', error)
            setImportMessage({
                text: 'Failed to reset data. Please try again.',
                type: 'error',
            })
        } finally {
            setResetting(false)
        }
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

        reader.onload = async (event) => {
            try {
                const backupData = JSON.parse(event.target.result)

                if (!Array.isArray(backupData.expenses)) {
                    throw new Error('Invalid expenses data')
                }

                if (!Number.isFinite(backupData.income)) {
                    throw new Error('Invalid income data')
                }

                if (
                    backupData.budgets === null ||
                    typeof backupData.budgets !== 'object' ||
                    Array.isArray(backupData.budgets)
                ) {
                    throw new Error('Invalid budget data')
                }

                await onRestoreData(backupData)

                setImportMessage({
                    text: 'Data imported successfully.',
                    type: 'success',
                })

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

            {/* Profile */}

            <div className="mt-10 max-w-2xl rounded-2xl border border-gray-800 bg-gray-900 p-6">
                <h3 className="text-xl font-semibold text-white">
                    👤 Profile
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                    Update the name shown in SpendWise.
                </p>

                <form
                    onSubmit={handleSaveName}
                    className="mt-6"
                >
                    <label
                        htmlFor="displayName"
                        className="block text-sm font-medium text-gray-300"
                    >
                        Your Name
                    </label>

                    <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                        <input
                            id="displayName"
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="Enter your name"
                            maxLength={50}
                            className="flex-1 rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none focus:border-indigo-500"
                        />

                        <Button
                            type="submit"
                            disabled={savingName}
                        >
                            {savingName ? 'Saving...' : 'Save Name'}
                        </Button>
                    </div>

                    {nameMessage.text && (
                        <p
                            className={`mt-3 text-sm ${
                                nameMessage.type === 'success'
                                    ? 'text-green-400'
                                    : 'text-red-400'
                            }`}
                        >
                            {nameMessage.type === 'success' ? '✅' : '⚠️'}{' '}
                            {nameMessage.text}
                        </p>
                    )}
                </form>
            </div>

            {/* Data Management */}

            <div className="mt-6 max-w-2xl rounded-2xl border border-gray-800 bg-gray-900 p-6">
                <h3 className="text-xl font-semibold text-white">
                    🗄️ Data Management
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                    Your SpendWise data is securely synced to your account and
                    can also be exported as a local backup.
                </p>

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

                {importMessage.text && (
                    <p
                        className={`mt-3 text-sm ${
                            importMessage.type === 'success'
                                ? 'text-green-400'
                                : 'text-red-400'
                        }`}
                    >
                        {importMessage.type === 'success' ? '✅' : '⚠️'}{' '}
                        {importMessage.text}
                    </p>
                )}

                <Button
                    variant="danger"
                    onClick={() => setShowResetConfirm(true)}
                    className="mt-6"
                >
                    Reset All Data
                </Button>
            </div>

            {/* Account */}

            <div className="mt-6 max-w-2xl rounded-2xl border border-gray-800 bg-gray-900 p-6">
                <h3 className="text-xl font-semibold text-white">
                    🔐 Account
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                    Sign out of your SpendWise account from here.
                </p>

                <div className="mt-6 max-w-xs">
                    <LogoutButton />
                </div>
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
                                onClick={handleReset}
                                disabled={resetting}
                            >
                                {resetting ? 'Resetting...' : 'Reset Data'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Settings
