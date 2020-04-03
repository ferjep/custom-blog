import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { MessageProvider } from './context/MessageContext'
import { Navbar, NavLink } from './components/Navbar'
import Posts from './components/Posts'
import PostEditor from './components/PostEditor'
import ConfigForm from './components/ConfigForm'

export default function Admin() {
  return (
    <div>
      <MessageProvider>
        <Navbar logo="Blog admin" logoTo="/admin/posts" admin>
          <NavLink to="/admin/posts">Posts</NavLink>
          <NavLink to="/admin/config">Config</NavLink>
          <NavLink to="/" last>
            Logout
          </NavLink>
        </Navbar>
        <Switch>
          <Route exact path="/admin/posts">
            <div className="page-center">
              <Posts admin />
            </div>
          </Route>
          <Route path="/admin/posts/new">
            <PostEditor />
          </Route>
          <Route path="/admin/posts/edit/:slug">
            <PostEditor edit />
          </Route>
          <Route path="/admin/config">
            <ConfigForm />
          </Route>
          <Route>
            <Redirect to="/admin/posts" />
          </Route>
        </Switch>
      </MessageProvider>
    </div>
  )
}
