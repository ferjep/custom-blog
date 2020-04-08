import React, { useState, useContext } from 'react'
import './AdminLoginForm.scss'
import { AdminAuthConext } from '../context/AdminAuthContext'
import { MessageContext } from '../context/MessageContext'
import { Redirect } from 'react-router-dom'

export default function AdminLoginForm() {
  const { isAdmin, onLogin, onLogout } = useContext(AdminAuthConext)
  const setMessage = useContext(MessageContext)
  const [data, setData] = useState({ username: '', password: '' })

  const handleChange = (e) => {
    const { value, name } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = () => {
    onLogin(data).catch((err) => {
      setMessage({ type: 'error', text: err })
      setData({ username: '', password: '' })
    })
  }

  if (isAdmin) return <Redirect to="/admin/posts" />

  return (
    <div className="Login page-center">
      <div className="Login-card">
        <h1 className="card-title">Admin Login</h1>
        <label className="card-label">
          <input
            type="text"
            name="username"
            className="card-label-input"
            placeholder="Username"
            value={data.username}
            onKeyDown={(e) => (e.keyCode === 13 ? handleLogin() : null)}
            onChange={handleChange}
          />
        </label>
        <label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="card-label-input"
            value={data.password}
            onKeyDown={(e) => (e.keyCode === 13 ? handleLogin() : null)}
            onChange={handleChange}
          />
        </label>
        <button className="btn card-btn" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  )
}
