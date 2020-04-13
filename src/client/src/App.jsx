import React from 'react'
import './App.scss'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { BlogConfigProvider } from './context/BlogConfigContext'
import Admin from './Admin'
import Blog from './Blog'
import { AdminAuthProvider } from './context/AdminAuthContext'
import { MessageProvider } from './context/MessageContext'

export default function App() {
  return (
    <BlogConfigProvider>
      <Router>
        <Switch>
          <Route path="/admin">
            <AdminAuthProvider>
              <MessageProvider>
                <Admin />
              </MessageProvider>
            </AdminAuthProvider>
          </Route>
          <Route path="/">
            <Blog />
          </Route>
        </Switch>
      </Router>
    </BlogConfigProvider>
  )
}
