import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import scrambleText from '../utils/textScrambler'
import { getAllPosts, BlogPost as BlogPostType } from '../utils/blog'
import WindowChrome from '../components/WindowChrome'
import LoadingTemplate from '../components/LoadingTemplate'
import Divider from '../components/Divider'
import Halftone from '../components/Halftone'
import './Home.css'

const Home = () => {
  const [highlightText, setHighlightText] = useState("hello world")
  const [blogPosts, setBlogPosts] = useState<BlogPostType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const scrambler = scrambleText({
      finalText: "Hello World!",
      duration: 1500,
      scrambleSpeed: 30,
      onUpdate: (text) => setHighlightText(text),
      onComplete: () => console.log("Scrambled eggs")
    });
    scrambler.start();
    return () => { scrambler.stop(); };
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

  const formatDate = (dateString: string) => {
    return new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateText = (text: string | undefined, maxLength: number = 100) => {
    if (!text) return '';
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
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/portfolio" className="cta-button primary">View Portfolio</Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/about" className="cta-button secondary">About Me</Link>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <WindowChrome title="featured_projects.exe">
          <h2 className="section-heading">Featured Projects</h2>
          <Divider />
          <div className="featured-grid">
            <a
              href="https://sack-of-storage.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="featured-item"
            >
              <Halftone size="sm" color="blush" pattern={"crosshatch"} />
              <div className="featured-image">
                <span className="featured-emoji">🎒</span>
              </div>
              <h3>Sack of Storage</h3>
              <p>Your Ultimate D&D Inventory Companion - Built with Vue 3 and TypeScript.</p>
            </a>
          </div>
        </WindowChrome>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <WindowChrome title="latest_posts.md">
          <h2 className="section-heading">Latest Blog Posts</h2>
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
                  <Halftone size="lg" color="cyan" opacity={0.35} angle={30} />
                  <h3>{post.title}</h3>
                  <p className="blog-date">{formatDate(post.date)}</p>
                  <p>{truncateText(post.excerpt, 100)}</p>
                  <Link to={`/blog/${post.slug}`} className="read-more">Read More</Link>
                </motion.div>
              ))
            )}
          </div>
        </WindowChrome>
      </motion.div>
    </div>
  )
}

export default Home
