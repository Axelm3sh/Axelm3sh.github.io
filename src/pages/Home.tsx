import { motion } from 'framer-motion'
import DynamicGeometricPlaceholder from '../components/DynamicGeometricPlaceholder'
import './Home.css'

const Home = () => {
  return (
    <div className="home-container">
      <motion.div 
        className="hero-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="hero-title">
          <span className="highlight">Axelm3sh</span>
          <span className="subtitle">Portfolio & Blog</span>
        </h1>

        <p className="hero-description">
          Welcome to my little frontier of digital space where I showcase my work, share my thoughts, and try things out.
        </p>

        <div className="cta-buttons">
          <motion.a 
            href="#portfolio-section" 
            className="cta-button primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Portfolio
          </motion.a>
          <motion.a 
            href="#about-section" 
            className="cta-button secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            About Me
          </motion.a>
        </div>
      </motion.div>

      <motion.div 
        className="card featured-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <h2>Featured Projects</h2>
        <div className="featured-grid">
          {/* Placeholder for featured projects */}
          <a 
            href="https://sack-of-storage.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="featured-item featured-item-link"
          >
            <div className="featured-image">
              <DynamicGeometricPlaceholder 
                size={140} 
                enableHover={true}
                changeInterval={3500}
                shapes={[]}
              />
            </div>
            <h3>Sack of Storage</h3>
            <p>Your Ultimate D&D Inventory Companion - Built with Vue 3 and TypeScript.</p>
          </a>
          <div className="featured-item">
            <div className="featured-image">
              <DynamicGeometricPlaceholder 
                size={140} 
                enableHover={true}
                changeInterval={4200}
                shapes={[]}
              />
            </div>
            <h3>Project Two</h3>
            <p>A brief description of the project and technologies used.</p>
          </div>
          <div className="featured-item">
            <div className="featured-image">
              <DynamicGeometricPlaceholder 
                size={140} 
                enableHover={true}
                changeInterval={3000}
                shapes={[]} // Empty array to test random shape selection
              />
            </div>
            <h3>Project Three</h3>
            <p>A brief description of the project and technologies used.</p>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="card blog-preview-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <h2>Latest Blog Posts</h2>
        <div className="blog-preview-grid">
          {/* Placeholder for blog posts */}
          <div className="blog-preview-item">
            <h3>Blog Post Title</h3>
            <p className="blog-date">May 26, 2025</p>
            <p>A brief excerpt from the blog post that gives readers an idea of what it's about.</p>
            <a href="#" className="read-more">Read More</a>
          </div>
          <div className="blog-preview-item">
            <h3>Another Blog Post</h3>
            <p className="blog-date">May 20, 2025</p>
            <p>A brief excerpt from lorem ipsum</p>
            <a href="#" className="read-more">Read More</a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Home
