import React from 'react'
import './App.scss'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { BlogConfigProvider } from './context/BlogConfigContext'
import Admin from './Admin'
import Blog from './Blog'

export default function App() {
  return (
    <BlogConfigProvider>
      <Router>
        <Switch>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/">
            <Blog />
          </Route>
        </Switch>
      </Router>
    </BlogConfigProvider>
  )
}
