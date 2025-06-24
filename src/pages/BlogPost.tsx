import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion';
import { getPostBySlug, BlogPost as BlogPostType } from '../utils/blog';
import BannerHexTriangles from '../components/BannerHexTriangles';
import './BlogPost.css';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      navigate('/blog');
      return;
    }

    try {
      const postData = getPostBySlug(slug);
      if (postData) {
        setPost(postData);
      } else {
        navigate('/blog');
      }
    } catch (error) {
      console.error('Error loading blog post:', error);
      navigate('/blog');
    } finally {
      setLoading(false);
    }
  }, [slug, navigate]);

  if (loading) {
    return <div className="blog-post-loading">Loading...</div>;
  }

  if (!post) {
    return null;
  }

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="blog-post-container">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="blog-post-banner"
      >
        <BannerHexTriangles />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="blog-post-header"
      >
        <h1>{post.title}</h1>
        <div className="blog-post-meta">
          <span className="blog-post-date">{formattedDate}</span>
          <div className="blog-post-tags">
            {post.tags.map((tag, index) => (
              <span key={index} className="blog-post-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="blog-post-content"
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </motion.div>

      <div className="blog-post-navigation">
        <button onClick={() => navigate('/blog')} className="back-to-blog-button">
          ← Back to Blog
        </button>
      </div>
    </div>
  );
};

export default BlogPost;
