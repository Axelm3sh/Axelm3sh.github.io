import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DynamicGeometricPlaceholder from '../components/DynamicGeometricPlaceholder'
import scrambleText from '../utils/textScrambler'
import { getAllPosts, BlogPost as BlogPostType } from '../utils/blog'
import LoadingTemplate from '../components/LoadingTemplate'
import Divider from '../components/Divider'
import './Home.css'

const Home = () => {
  const [highlightText, setHighlightText] = useState("hello world")
  const [blogPosts, setBlogPosts] = useState<BlogPostType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Start the text scrambling effect when component mounts
    const scrambler = scrambleText({
      finalText: "Hello World!",
      duration: 1500, // Shorter duration for faster effect
      scrambleSpeed: 30, // Faster scramble speed for more dynamic effect
      onUpdate: (text) => setHighlightText(text),
      onComplete: () => console.log("Scrambled eggs")
    });

    scrambler.start();

    // Cleanup on unmount
    return () => {
      scrambler.stop();
    };
  }, []);

  useEffect(() => {
    try {
      const posts = getAllPosts()
      setBlogPosts(posts)
    } catch (error) {
      console.error('Error loading blog posts:', error)
    } finally {
      setLoading(false)
    }
  }, []);

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Truncate text after a certain number of characters
  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <div className="home-container">
      <motion.div 
        className="hero-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="hero-title">
          <span className="highlight">{highlightText}</span>
          <span className="subtitle">(and I suppose hello robots too)</span>
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
        <Divider />
        <div className="featured-grid">
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
        </div>
      </motion.div>

      <motion.div 
        className="card blog-preview-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <h2>Latest Blog Posts</h2>
        <Divider />
        <div className="blog-preview-grid">
          {loading ? (
            <LoadingTemplate message="Loading blog posts..." />
          ) : blogPosts.length === 0 ? (
            <div className="no-posts">No blog posts found.</div>
          ) : (
            blogPosts.slice(0, 3).map((post, index) => (
              <motion.div 
                key={post.slug}
                className="blog-preview-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <h3>{post.title}</h3>
                <p className="blog-date">{formatDate(post.date)}</p>
                <p>{truncateText(post.excerpt, 100)}</p>
                <Link to={`/blog/${post.slug}`} className="read-more">Read More</Link>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default Home
