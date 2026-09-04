import { useAuth } from './context/AuthContext'
import {
  getUserData,
  saveUserData,
  getExpenses,
  addExpense as addExpenseToFirestore,
  updateExpense as updateExpenseInFirestore,
  deleteExpense as deleteExpenseFromFirestore,
} from './firebase/firestore'

import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import Auth from './pages/Auth'

import DashboardLayout from './layouts/DashboardLayout'

import Dashboard from './pages/Dashboard'
import Expenses from './pages/Expenses'
import Budget from './pages/Budget'
import Analytics from './pages/Analytics'
import CurrencyConverter from './pages/CurrencyConverter'
import Settings from './pages/Settings'

const demoExpenses = [
  {
    id: 101,
    amount: 6800,
    category: 'Housing',
    description: 'Apartment rent',
    date: '2026-08-01',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: 102,
    amount: 1240,
    category: 'Food',
    description: 'Weekly groceries',
    date: '2026-08-04',
    paymentMethod: 'UPI',
  },
  {
    id: 103,
    amount: 420,
    category: 'Transport',
    description: 'Metro recharge',
    date: '2026-08-08',
    paymentMethod: 'UPI',
  },
  {
    id: 104,
    amount: 1850,
    category: 'Education',
    description: 'Online course',
    date: '2026-08-12',
    paymentMethod: 'Credit Card',
  },
  {
    id: 105,
    amount: 760,
    category: 'Entertainment',
    description: 'Concert tickets',
    date: '2026-08-18',
    paymentMethod: 'UPI',
  },
  {
    id: 106,
    amount: 990,
    category: 'Food',
    description: 'Team dinner',
    date: '2026-08-24',
    paymentMethod: 'UPI',
  },
]

const defaultBudgets = {
  monthly: 20000,
  categories: {},
}

const getStoredData = (key, fallback, validator) => {
  try {
    const savedData = localStorage.getItem(key)

    if (!savedData) {
      return fallback
    }

    const parsedData = JSON.parse(savedData)

    return validator(parsedData)
      ? parsedData
      : fallback
  } catch (error) {
    console.error(
      `Failed to load ${key} from localStorage`,
      error
    )

    return fallback
  }
}

const getStoredNumber = (key, fallback) => {
  const savedValue = localStorage.getItem(key)

  const number = Number(savedValue)

  return savedValue !== null && Number.isFinite(number)
    ? number
    : fallback
}

function App() {
  const { user } = useAuth()

  const [expenses, setExpenses] = useState([])

  const [income, setIncome] = useState(50000)

  const [budgets, setBudgets] = useState(defaultBudgets)

  const [dataLoading, setDataLoading] = useState(true)
  const [loadedUserId, setLoadedUserId] = useState(null)

  const getUserCacheKey = (userId, key) =>
    `spendwise-${userId}-${key}`

  useEffect(() => {
    let cancelled = false

    setLoadedUserId(null)

    if (!user) {
      setExpenses([])
      setIncome(50000)
      setBudgets(defaultBudgets)
      setDataLoading(false)
      return
    }

    const loadUserData = async () => {
      setDataLoading(true)

      try {
        const [userData, firestoreExpenses] =
          await Promise.all([
            getUserData(user.uid),
            getExpenses(user.uid),
          ])

        if (cancelled) {
          return
        }

        // Firebase is the source of truth. For older accounts that were
        // created before the migration was completed, use only that user's
        // own browser cache as a fallback and then save it to Firebase.
        const cachedIncome = getStoredNumber(
          getUserCacheKey(user.uid, 'income'),
          50000
        )

        const cachedBudgets = getStoredData(
          getUserCacheKey(user.uid, 'budgets'),
          defaultBudgets,
          (data) =>
            data !== null &&
            typeof data === 'object' &&
            !Array.isArray(data)
        )

        const hasUserIncome =
          userData &&
          Number.isFinite(Number(userData.income))

        const hasUserBudgets =
          userData &&
          userData.budgets &&
          typeof userData.budgets === 'object' &&
          !Array.isArray(userData.budgets)

        const loadedIncome =
          hasUserIncome ? Number(userData.income) : cachedIncome

        const loadedBudgets =
          hasUserBudgets ? userData.budgets : cachedBudgets

        setIncome(loadedIncome)
        setBudgets(loadedBudgets)
        setExpenses(firestoreExpenses)

        // Create missing account fields without overwriting values that
        // already exist for the signed-in user.
        const dataToSave = {}

        if (!hasUserIncome) {
          dataToSave.income = loadedIncome
        }

        if (!hasUserBudgets) {
          dataToSave.budgets = loadedBudgets
        }

        if (Object.keys(dataToSave).length > 0) {
          await saveUserData(user.uid, dataToSave)
        }

        if (!cancelled) {
          setLoadedUserId(user.uid)
        }
      } catch (error) {
        if (!cancelled) {
          console.error(
            'Failed to load SpendWise data',
            error
          )
        }
      } finally {
        if (!cancelled) {
          setDataLoading(false)
        }
      }
    }

    loadUserData()

    return () => {
      cancelled = true
    }
  }, [user])

  useEffect(() => {
    if (!user || dataLoading || loadedUserId !== user.uid) {
      return
    }

    localStorage.setItem(
      getUserCacheKey(user.uid, 'expenses'),
      JSON.stringify(expenses)
    )
  }, [expenses, user, dataLoading, loadedUserId])

  useEffect(() => {
    if (!user || dataLoading || loadedUserId !== user.uid) {
      return
    }

    localStorage.setItem(
      getUserCacheKey(user.uid, 'income'),
      income.toString()
    )

    saveUserData(user.uid, {
      income,
    }).catch((error) => {
      console.error(
        'Failed to save income to Firestore',
        error
      )
    })
  }, [income, user, dataLoading, loadedUserId])

  useEffect(() => {
    if (!user || dataLoading || loadedUserId !== user.uid) {
      return
    }

    localStorage.setItem(
      getUserCacheKey(user.uid, 'budgets'),
      JSON.stringify(budgets)
    )

    saveUserData(user.uid, {
      budgets,
    }).catch((error) => {
      console.error(
        'Failed to save budgets to Firestore',
        error
      )
    })
  }, [budgets, user, dataLoading, loadedUserId])

  const addExpense = async (expense) => {
    if (!user) {
      return
    }

    try {
      const { id: _id, ...expenseData } = expense

      const savedExpense =
        await addExpenseToFirestore(
          user.uid,
          expenseData
        )

      setExpenses((previousExpenses) => [
        savedExpense,
        ...previousExpenses,
      ])
    } catch (error) {
      console.error(
        'Failed to add expense to Firestore',
        error
      )

      throw error
    }
  }

  const deleteExpense = async (expenseId) => {
    if (!user) {
      return
    }

    try {
      await deleteExpenseFromFirestore(
        user.uid,
        expenseId
      )

      setExpenses((previousExpenses) =>
        previousExpenses.filter(
          (expense) =>
            expense.id !== expenseId
        )
      )
    } catch (error) {
      console.error(
        'Failed to delete expense from Firestore',
        error
      )

      throw error
    }
  }

  const updateExpense = async (updatedExpense) => {
    if (!user) {
      return
    }

    try {
      const { id, ...expenseData } =
        updatedExpense

      await updateExpenseInFirestore(
        user.uid,
        id,
        expenseData
      )

      setExpenses((previousExpenses) =>
        previousExpenses.map((expense) =>
          expense.id === id
            ? updatedExpense
            : expense
        )
      )
    } catch (error) {
      console.error(
        'Failed to update expense in Firestore',
        error
      )

      throw error
    }
  }

  const updateMonthlyBudget = (amount) => {
    setBudgets((previousBudgets) => ({
      ...previousBudgets,
      monthly: Number(amount),
    }))
  }

  const updateCategoryBudget = (
    category,
    amount
  ) => {
    setBudgets((previousBudgets) => ({
      ...previousBudgets,

      categories: {
        ...previousBudgets.categories,
        [category]: Number(amount),
      },
    }))
  }

  const restoreData = async (backupData) => {
    if (!user) {
      return
    }

    try {
      /*
       * Remove existing Firestore expenses
       */
      const existingExpenses = await getExpenses(user.uid)

      for (const expense of existingExpenses) {
        await deleteExpenseFromFirestore(
          user.uid,
          expense.id
        )
      }

      /*
       * Add imported expenses to Firestore
       */
      const restoredExpenses = []

      for (const expense of backupData.expenses) {
        const { id: _id, ...expenseData } = expense

        const savedExpense =
          await addExpenseToFirestore(
            user.uid,
            expenseData
          )

        restoredExpenses.push(savedExpense)
      }

      /*
       * Update React state
       */
      setExpenses(restoredExpenses)
      setIncome(backupData.income)
      setBudgets(backupData.budgets)

      /*
       * Save income and budgets to Firestore
       */
      await saveUserData(user.uid, {
        income: backupData.income,
        budgets: backupData.budgets,
      })

      /*
       * Keep localStorage backup in sync
       */
      localStorage.setItem(
        getUserCacheKey(user.uid, 'expenses'),
        JSON.stringify(restoredExpenses)
      )

      localStorage.setItem(
        getUserCacheKey(user.uid, 'income'),
        backupData.income.toString()
      )

      localStorage.setItem(
        getUserCacheKey(user.uid, 'budgets'),
        JSON.stringify(
          backupData.budgets
        )
      )
    } catch (error) {
      console.error(
        'Failed to restore backup data',
        error
      )

      throw error
    }
  }

  const loadDemoData = async () => {
    if (!user) {
      return
    }

    try {
      // Demo data is a replacement set. Clear remote records first so they
      // do not reappear after a later reload.
      const existingExpenses = await getExpenses(user.uid)

      await Promise.all(
        existingExpenses.map((expense) =>
          deleteExpenseFromFirestore(user.uid, expense.id)
        )
      )

      const savedDemoExpenses = []

      for (const expense of demoExpenses) {
        const { id: _id, ...expenseData } =
          expense

        const savedExpense =
          await addExpenseToFirestore(
            user.uid,
            expenseData
          )

        savedDemoExpenses.push(
          savedExpense
        )
      }

      setExpenses(savedDemoExpenses)

      const demoIncome = 50000

      const demoBudgets = {
        monthly: 18000,
        categories: {
          Food: 5000,
          Transport: 2500,
          Entertainment: 3000,
        },
      }

      setIncome(demoIncome)
      setBudgets(demoBudgets)

      await saveUserData(user.uid, {
        income: demoIncome,
        budgets: demoBudgets,
      })
    } catch (error) {
      console.error(
        'Failed to load demo data',
        error
      )
    }
  }

  if (user && dataLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950">
        <p className="text-gray-400">
          Loading your SpendWise data...
        </p>
      </div>
    )
  }

  return (
    <Routes>
      <Route
        path="/auth"
        element={<Auth />}
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dashboard
                expenses={expenses}
                income={income}
                onIncomeChange={setIncome}
                onLoadDemoData={
                  loadDemoData
                }
              />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/expenses"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Expenses
                expenses={expenses}
                onAddExpense={addExpense}
                onDeleteExpense={
                  deleteExpense
                }
                onUpdateExpense={
                  updateExpense
                }
              />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/budget"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Budget
                expenses={expenses}
                budgets={budgets}
                onUpdateMonthlyBudget={
                  updateMonthlyBudget
                }
                onUpdateCategoryBudget={
                  updateCategoryBudget
                }
              />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Analytics
                expenses={expenses}
              />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/currency-converter"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <CurrencyConverter />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Settings
                expenses={expenses}
                income={income}
                budgets={budgets}
                onResetData={() =>
                  restoreData({
                    expenses: [],
                    income: 50000,
                    budgets: defaultBudgets,
                  })
                }
                onRestoreData={
                  restoreData
                }
              />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
