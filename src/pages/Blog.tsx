import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllPosts, BlogPost as BlogPostType } from '../utils/blog'
import BannerHexTriangles from '../components/BannerHexTriangles'
import LoadingTemplate from '../components/LoadingTemplate'
import Divider from '../components/Divider'
import './Blog.css'

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPostType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const posts = getAllPosts()
      setBlogPosts(posts)
    } catch (error) {
      console.error('Error loading blog posts:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Extract all unique tags from blog posts
  const allTags = Array.from(
    new Set(blogPosts.flatMap(post => post.tags || []))
  );

  if (loading) {
    return (
      <div className="blog-container">
        <LoadingTemplate message="Loading blog posts..." />
      </div>
    );
  }

  return (
    <div className="blog-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="blog-header"
      >
        <h1>Blog</h1>
        <Divider />
        <p className="blog-intro">
          Welcome to my blog! Here I share my thoughts and experiences on web development, design, and technology.
        </p>
      </motion.div>

      <div className="blog-content">
        <div className="blog-main">
          {blogPosts.length === 0 ? (
            <div className="no-posts">No blog posts found.</div>
          ) : (
            <motion.div 
              className="blog-posts"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {blogPosts.map((post, index) => (
                <motion.article 
                  key={post.slug}
                  className="blog-post card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  <div className="blog-post-image">
                    <BannerHexTriangles />
                  </div>
                  <div className="blog-post-content">
                    <h2 data-testid={`post-title-${post.slug}`}>{post.title}</h2>
                    <p className="blog-post-date" data-testid={`post-date-${post.slug}`}>{formatDate(post.date)}</p>
                    <p className="blog-post-excerpt">{post.excerpt}</p>
                    <div className="blog-post-tags">
                      {post.tags.map((tag, i) => (
                        <span key={i} className="blog-post-tag" data-testid={`post-tag-${tag}`}>{tag}</span>
                      ))}
                    </div>
                    <Link to={`/blog/${post.slug}`} className="blog-post-link" data-testid={`read-more-${post.slug}`}>Read More</Link>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>

        <aside className="blog-sidebar">
          <div className="sidebar-section card">
            <h3>Recent Posts</h3>
            <Divider width="70%" />
            <ul className="recent-posts-list">
              {blogPosts.slice(0, 3).map(post => (
                <li key={post.slug}>
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-section card">
            <h3>Tags</h3>
            <Divider width="70%" />
            <div className="tags-cloud">
              {allTags.map((tag, index) => (
                <span key={index} className="tag" data-testid={`tag-${tag}`}>{tag}</span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Blog
