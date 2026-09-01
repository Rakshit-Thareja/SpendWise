import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import DashboardLayout from './layouts/DashboardLayout'

import Dashboard from './pages/Dashboard'
import Expenses from './pages/Expenses'
import Budget from './pages/Budget'
import Analytics from './pages/Analytics'
import CurrencyConverter from './pages/CurrencyConverter'
import Settings from './pages/Settings'

const demoExpenses = [
  { id: 101, amount: 6800, category: 'Housing', description: 'Apartment rent', date: '2026-08-01', paymentMethod: 'Bank Transfer' },
  { id: 102, amount: 1240, category: 'Food', description: 'Weekly groceries', date: '2026-08-04', paymentMethod: 'UPI' },
  { id: 103, amount: 420, category: 'Transport', description: 'Metro recharge', date: '2026-08-08', paymentMethod: 'UPI' },
  { id: 104, amount: 1850, category: 'Education', description: 'Online course', date: '2026-08-12', paymentMethod: 'Credit Card' },
  { id: 105, amount: 760, category: 'Entertainment', description: 'Concert tickets', date: '2026-08-18', paymentMethod: 'UPI' },
  { id: 106, amount: 990, category: 'Food', description: 'Team dinner', date: '2026-08-24', paymentMethod: 'UPI' },
]


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
  const [expenses, setExpenses] = useState(() =>
    getStoredData('spendwise-expenses', [], Array.isArray)
  )

  const [income, setIncome] = useState(() =>
    getStoredNumber('spendwise-income', 50000)
  )

  const [budgets, setBudgets] = useState(() =>
    getStoredData(
      'spendwise-budgets',
      {
        monthly: 20000,
        categories: {},
      },
      (data) =>
        data !== null &&
        typeof data === 'object' &&
        !Array.isArray(data)
    )
  )

  useEffect(() => {
    localStorage.setItem(
      'spendwise-budgets',
      JSON.stringify(budgets)
    )
  }, [budgets])

  const addExpense = (expense) => {
    setExpenses((previousExpenses) => [
      expense,
      ...previousExpenses,
    ])
  }

  const deleteExpense = (expenseId) => {
    setExpenses((previousExpenses) =>
      previousExpenses.filter(
        (expense) => expense.id !== expenseId
      )
    )
  }

  const updateExpense = (updatedExpense) => {
    setExpenses((previousExpenses) =>
      previousExpenses.map((expense) =>
        expense.id === updatedExpense.id
          ? updatedExpense
          : expense
      )
    )
  }

  const updateMonthlyBudget = (amount) => {
    setBudgets((previousBudgets) => ({
      ...previousBudgets,
      monthly: Number(amount),
    }))
  }

  const updateCategoryBudget = (category, amount) => {
    setBudgets((previousBudgets) => ({
      ...previousBudgets,

      categories: {
        ...previousBudgets.categories,
        [category]: Number(amount),
      },
    }))
  }

  useEffect(() => {
    localStorage.setItem(
      'spendwise-expenses',
      JSON.stringify(expenses)
    )
  }, [expenses])

  useEffect(() => {
    localStorage.setItem(
      'spendwise-income',
      income.toString()
    )
  }, [income])

  const restoreData = (backupData) => {
    setExpenses(backupData.expenses)
    setIncome(backupData.income)
    setBudgets(backupData.budgets)
  }

  const loadDemoData = () => {
    setExpenses(demoExpenses)
    setIncome(50000)
    setBudgets({
      monthly: 18000,
      categories: { Food: 5000, Transport: 2500, Entertainment: 3000 },
    })
  }

  return (
    <DashboardLayout>
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              expenses={expenses}
              income={income}
              onIncomeChange={setIncome}
              onLoadDemoData={loadDemoData}
            />
          }
        />

        <Route
          path="/expenses"
          element={
            <Expenses
              expenses={expenses}
              onAddExpense={addExpense}
              onDeleteExpense={deleteExpense}
              onUpdateExpense={updateExpense}
            />
          }
        />

        <Route
          path="/budget"
          element={
            <Budget
              expenses={expenses}
              budgets={budgets}
              onUpdateMonthlyBudget={updateMonthlyBudget}
              onUpdateCategoryBudget={updateCategoryBudget}
            />
          }
        />

        <Route
          path="/analytics"
          element={<Analytics expenses={expenses} />}
        />

        <Route
          path="/currency-converter"
          element={<CurrencyConverter />}
        />

        <Route
          path="/settings"
          element={
            <Settings
              expenses={expenses}
              income={income}
              budgets={budgets}
              onResetData={() => {
                setExpenses([])
                setIncome(50000)
                setBudgets({
                  monthly: 20000,
                  categories: {},
                })
              }}
              onRestoreData={restoreData}
            />
          }
        />

      </Routes>

    </DashboardLayout>
  )
}

export default App
