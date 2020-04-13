import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Loading from '../components/Loading'

export const AdminAuthConext = React.createContext()

export function AdminAuthProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [home, setHome] = useState(false)

  useEffect(() => {
    fetch('/api/admin/verify')
      .then(res => res.json())
      .then(json => {
        if (json.ok) setIsAdmin(true)
        setIsLoading(false)
      })
      .catch(err => {
        setIsLoading(false)
      })
  }, [])

  const doLogin = user => {
    return new Promise((resolve, reject) => {
      fetch('/api/admin/login', {
        method: 'post',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(json => {
          if (json.ok) {
            setIsAdmin(true)
            resolve()
          } else {
            reject(json.msg)
          }
        })
        .catch(err => reject('Could not get to the server'))
    })
  }

  const doLogout = () => {
    return new Promise((resolve, reject) => {
      fetch('/api/admin/logout')
        .then(res => res.json())
        .then(json => {
          if (json.ok) {
            resolve()
            setIsAdmin(false)
            setHome(true)
          }

          reject()
        })
        .catch(err => reject('Could not get to the server'))
    })
  }

  if (home) return <Redirect to="/" />

  if (isLoading) return <Loading />

  return (
    <AdminAuthConext.Provider value={{ isAdmin, doLogin, doLogout }}>
      {children}
    </AdminAuthConext.Provider>
  )
}
