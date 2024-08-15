import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './styles.scss'

export const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('https://1223-14-161-33-35.ngrok-free.app/login', {
        loginForm: {
          username: username,
          password: password
        }
      })
      if (response.status === 200) {
        const data = response.data
        localStorage.setItem('token', data.token)
        localStorage.setItem('refreshToken', data.refreshToken)
        localStorage.setItem('username', data.username)
        navigate('/dashboard')
      } else {
        alert('Invalid credentials: Please check your username and password.')
      }
    } catch (error) {
      console.error('Error during login:', error)
      if (error.response && error.response.data) {
        alert('Invalid credentials: ' + (error.response.data.message || 'Please check your username and password.'))
      } else {
        alert('Login failed!')
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
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
