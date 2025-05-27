import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Navbar.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Axelm3sh
          </motion.div>
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          <div className={`hamburger ${isOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`} 
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/about" 
              className={`nav-link ${isActive('/about') ? 'active' : ''}`} 
              onClick={closeMenu}
            >
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/portfolio" 
              className={`nav-link ${isActive('/portfolio') ? 'active' : ''}`} 
              onClick={closeMenu}
            >
              Portfolio
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/blog" 
              className={`nav-link ${isActive('/blog') ? 'active' : ''}`} 
              onClick={closeMenu}
            >
              Blog
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/contact" 
              className={`nav-link ${isActive('/contact') ? 'active' : ''}`} 
              onClick={closeMenu}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar