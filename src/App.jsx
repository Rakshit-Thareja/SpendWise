import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import DashboardLayout from './layouts/DashboardLayout'

import Dashboard from './pages/Dashboard'
import Expenses from './pages/Expenses'
import Budget from './pages/Budget'
import Analytics from './pages/Analytics'

function App() {
  const [expenses, setExpenses] = useState([])

  const addExpense = (expense) => {
    setExpenses((previousExpenses) => [
      expense,
      ...previousExpenses,
    ])
  }

  return (
    <DashboardLayout>
      <Routes>
        <Route
          path="/"
          element={<Dashboard expenses={expenses} />}
        />

        <Route
          path="/expenses"
          element={
            <Expenses
              expenses={expenses}
              onAddExpense={addExpense}
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