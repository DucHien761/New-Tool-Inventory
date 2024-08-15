import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './styles.scss'

export const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessages, setErrorMessages] = useState({})
  
  const validateForm = () => {
    const errors = {}

    if (!username) {
      errors.username = 'Username is required'
    } else if (/^[0-9]/.test(username)) {
      errors.username = 'Username cannot start with a number!'
    }

    if (!password) {
      errors.password = 'Password is required!'
    }

    return errors
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    // Validate form
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors)
      return
    }

    try {
      const response = await axios.post('http://localhost:8081/login', {
        loginForm: {
          username: username,
          password: 123123
        }
      })
      if (response.status === 200) {
        const data = response.data
        localStorage.setItem('token', data.token)
        localStorage.setItem('refreshToken', data.refreshToken)
        localStorage.setItem('username', data.username)
        navigate('/dashboard')
      } else {
        setErrorMessages({ form: 'Login failed. Please try again.' })
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessages({ form: 'Invalid credentials. Please check your username and password.' })
      } else {
        setErrorMessages({ form: 'Login failed. Please try again.' })
      }
    }
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {errorMessages.username && <p className="error">{errorMessages.username}</p>}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errorMessages.password && <p className="error">{errorMessages.password}</p>}
        </div>
        {errorMessages.form && <p className="error">{errorMessages.form}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
