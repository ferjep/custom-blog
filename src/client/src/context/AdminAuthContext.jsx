import React, { useState, useContext, useEffect } from 'react'
import Loading from '../components/Loading'

export const AdminAuthConext = React.createContext()

export function AdminAuthProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // fetch('/api/admin/verify', {
    //   credentials: 'same-origin',
    // })
    //   .then((res) => res.json())
    //   .then((json) => {
    //     if (json.ok) setIsAdmin(true)
    //     setIsLoading(false)
    //   })
    //   .catch((err) => {
    //     setMessage({ type: 'error', text: 'Could not get to the server' })
    //     setIsLoading(false)
    //   })
    setIsLoading(false)
  }, [])

  const onLogin = (user) => {
    return new Promise((resolve, reject) => {
      fetch('/api/admin/login', {
        method: 'post',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.ok) {
            setIsAdmin(true)
            resolve()
          } else {
            reject(json.msg)
          }
        })
        .catch((err) => reject('Could not get to the server'))
    })
  }

  const onLogout = () => setIsAdmin(false)

  if (isLoading) return <Loading />

  return (
    <AdminAuthConext.Provider value={{ isAdmin, onLogin, onLogout }}>
      {children}
    </AdminAuthConext.Provider>
  )
}
