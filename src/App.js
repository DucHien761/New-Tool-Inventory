import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Login from './component/Login/Login'
import Dashboard from './component/Dashboard/index'
import Header from './component/Header/Header'

export const App = () => {
  const isAuthenticated = localStorage.getItem('token')
  const username = localStorage.getItem('username')

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={true ? (
            <>
              <Header username={username} />
              <Dashboard />
            </>
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App
