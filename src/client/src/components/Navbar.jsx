import React, { useState, useEffect } from 'react'
import './Navbar.scss'
import { NavLink as NavbarLink, Link, useLocation } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'

export function NavLink({ last, children, ...rest }) {
  return (
    <li className={last ? 'nav-item nav-item--last' : 'nav-item'}>
      <NavbarLink className="nav-link" {...rest}>
        {children}
      </NavbarLink>
    </li>
  )
}

export function Navbar({ logo, logoTo, admin, children }) {
  const location = useLocation()
  const [navPanel, setNavPanel] = useState(false)

  const ToggleNav = () => setNavPanel(prev => !prev)

  useEffect(() => {
    if (navPanel) {
      console.log(location)
      setNavPanel(false)
    }
  }, [location.pathname])

  return (
    <nav className={admin ? 'navbar admin' : 'navbar blog'}>
      <div
        className={
          admin
            ? 'navbar-center admin page-center'
            : 'navbar-center blog page-center'
        }
      >
        <div className="navbar-logo border-white">
          <Link to={logoTo}>{logo}</Link>
        </div>
        <ul className={navPanel ? 'navbar-nav navbar-nav--show' : 'navbar-nav'}>
          <li className="navbar-nav-title">Menu</li>
          {children}
        </ul>
        <div
          className="navbar-nav--closer"
          style={navPanel ? { display: 'block' } : { display: 'none' }}
          onClick={ToggleNav}
        ></div>
        <div className="navbar-btn border-white" onClick={ToggleNav}>
          <FaBars />
        </div>
      </div>
    </nav>
  )
}
