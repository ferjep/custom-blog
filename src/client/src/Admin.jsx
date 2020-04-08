import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { MessageProvider } from './context/MessageContext'
import { AdminAuthProvider, AdminAuthConext } from './context/AdminAuthContext'
import { Navbar, NavLink } from './components/Navbar'
import Posts from './components/Posts'
import PostEditor from './components/PostEditor'
import ConfigForm from './components/ConfigForm'
import AdminLoginForm from './components/AdminLoginForm'

const PrivateRoute = ({ children, ...props }) => {
  const { isAdmin } = useContext(AdminAuthConext)

  if (!isAdmin) return <Redirect to="/admin" />

  return <Route {...props}>{children}</Route>
}

export default function Admin() {
  return (
    <div>
      <MessageProvider>
        <AdminAuthProvider>
          <Switch>
            <Route exact path="/admin">
              <AdminLoginForm />
            </Route>
            <PrivateRoute exact path="/admin/*">
              <Navbar logo="Blog admin" logoTo="/admin/posts" admin>
                <NavLink to="/admin/posts">Posts</NavLink>
                <NavLink to="/admin/config">Config</NavLink>
                <NavLink to="/" last>
                  Logout
                </NavLink>
              </Navbar>
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
            </PrivateRoute>
          </Switch>
        </AdminAuthProvider>
      </MessageProvider>
    </div>
  )
}
