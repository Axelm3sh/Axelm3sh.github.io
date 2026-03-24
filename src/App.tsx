import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import HalftoneOverlay from './components/HalftoneOverlay'
import DecorativeShapes from './components/DecorativeShapes'
import BouncyBeachBall from './components/BouncyBeachBall'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Portfolio from './pages/Portfolio'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true)
  const LOADING_DURATION = 3500;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, LOADING_DURATION)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="loading-screen">
        <HalftoneOverlay />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="loading-content"
        >
          <h1>Loading...</h1>
        </motion.div>
        <BouncyBeachBall speed={400} />
      </div>
    )
  }

  return (
    <div className="app">
      <HalftoneOverlay />
      <DecorativeShapes />
      <div className="content">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer>
          <p>&copy; 2019-{new Date().getFullYear()} Daniel Phan. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

export default App
