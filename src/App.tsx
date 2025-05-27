import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import MatrixBackground from './components/MatrixBackground'
import Navbar from './components/Navbar'
import LoadingHexagon from './components/LoadingHexagon'
import Home from './pages/Home'
import About from './pages/About'
import Portfolio from './pages/Portfolio'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true)
  const LOADING_DURATION = 2000;

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false)
    }, LOADING_DURATION)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
        <div className="loading-screen">
          <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{duration: 0.5}}
              className="loading-content"
          >
            <h1>Loading...</h1>
            <LoadingHexagon duration={LOADING_DURATION / 1000}/>
          </motion.div>
        </div>
    )
  }

  return (
    <div className="app">
      <MatrixBackground />
      <div className="content">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer>
          <p>© 2019-{new Date().getFullYear()} Daniel Phan. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

export default App
