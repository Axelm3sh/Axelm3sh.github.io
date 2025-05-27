import { motion } from 'framer-motion'
import './Blog.css'

const Blog = () => {
  // Placeholder blog posts data with lorem ipsum
  const blogPosts = [
    {
      id: 1,
      title: 'Lorem Ipsum Dolor Sit Amet',
      date: 'May 26, 2025',
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc.',
      tags: ['Lorem', 'Ipsum', 'Dolor'],
      image: 'placeholder',
    },
    {
      id: 2,
      title: 'Consectetur Adipiscing Elit',
      date: 'May 20, 2025',
      excerpt: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.',
      tags: ['Consectetur', 'Adipiscing', 'Elit'],
      image: 'placeholder',
    },
    {
      id: 3,
      title: 'Nullam Quis Risus Eget Urna',
      date: 'May 15, 2025',
      excerpt: 'Cras mattis consectetur purus sit amet fermentum. Nullam quis risus eget urna mollis ornare vel eu leo. Donec ullamcorper nulla non metus.',
      tags: ['Nullam', 'Risus', 'Urna'],
      image: 'placeholder',
    },
    {
      id: 4,
      title: 'Donec Sed Odio Dui',
      date: 'May 10, 2025',
      excerpt: 'Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper.',
      tags: ['Donec', 'Odio', 'Dui'],
      image: 'placeholder',
    },
  ]

  return (
    <div className="blog-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="blog-header"
      >
        <h1>Blog</h1>
        <p className="blog-intro">
          This is a placeholder for the Blog page. I plan to eventually share stuff here.
        </p>
      </motion.div>

      <div className="blog-content">
        <div className="blog-main">
          <motion.div 
            className="blog-posts"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {blogPosts.map((post, index) => (
              <motion.article 
                key={post.id}
                className="blog-post card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <div className="blog-post-image placeholder"></div>
                <div className="blog-post-content">
                  <h2>{post.title}</h2>
                  <p className="blog-post-date">{post.date}</p>
                  <p className="blog-post-excerpt">{post.excerpt}</p>
                  <div className="blog-post-tags">
                    {post.tags.map((tag, i) => (
                      <span key={i} className="blog-post-tag">{tag}</span>
                    ))}
                  </div>
                  <a href="#" className="blog-post-link">Read More</a>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>

        <aside className="blog-sidebar">
          <div className="sidebar-section card">
            <h3>Categories</h3>
            <ul className="category-list">
              <li><a href="#">Web Development</a> (4)</li>
              <li><a href="#">Design</a> (2)</li>
              <li><a href="#">3D Graphics</a> (1)</li>
              <li><a href="#">Animation</a> (1)</li>
              <li><a href="#">Tutorials</a> (3)</li>
            </ul>
          </div>

          <div className="sidebar-section card">
            <h3>Recent Posts</h3>
            <ul className="recent-posts-list">
              <li><a href="#">Lorem Ipsum Dolor Sit Amet</a></li>
              <li><a href="#">Consectetur Adipiscing Elit</a></li>
              <li><a href="#">Nullam Quis Risus Eget Urna</a></li>
            </ul>
          </div>

          <div className="sidebar-section card">
            <h3>Tags</h3>
            <div className="tags-cloud">
              <a href="#" className="tag">React</a>
              <a href="#" className="tag">TypeScript</a>
              <a href="#" className="tag">Animation</a>
              <a href="#" className="tag">Three.js</a>
              <a href="#" className="tag">CSS</a>
              <a href="#" className="tag">Web Development</a>
              <a href="#" className="tag">Design</a>
              <a href="#" className="tag">Tutorial</a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Blog
