import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import DashboardLayout from './layouts/DashboardLayout'

import Dashboard from './pages/Dashboard'
import Expenses from './pages/Expenses'
import Budget from './pages/Budget'
import Analytics from './pages/Analytics'

function App() {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('spendwise-expenses')

    return savedExpenses
      ? JSON.parse(savedExpenses)
      : []
  })

  const [income, setIncome] = useState(() => {
    const savedIncome = localStorage.getItem('spendwise-income')

    return savedIncome
      ? Number(savedIncome)
      : 50000
  })

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
          element={<Budget expenses={expenses} />}
        />

        <Route
          path="/analytics"
          element={<Analytics expenses={expenses} />}
        />
      </Routes>
    </DashboardLayout>
  )
}

export default App