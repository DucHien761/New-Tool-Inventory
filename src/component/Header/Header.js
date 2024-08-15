import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles.scss'

const Header = ({ username }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('username')
    navigate('/login')
  }

  console.log(username)

  return (
    <div className="header">
      <div className="header-right">
        <div className="username" onClick={() => setDropdownVisible(!dropdownVisible)}>
          {username} 
        </div>
        {dropdownVisible && (
          <div className="dropdown">
            <button onClick={handleLogout} className="dropdown-item">Logout</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
