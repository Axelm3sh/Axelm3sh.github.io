import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import WindowChrome from '../components/WindowChrome';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="not-found-wrapper"
      >
        <WindowChrome title="error_404.log" className="not-found-window">
          <div className="not-found-content">
            <h1 className="not-found-title">404</h1>
            <div className="not-found-divider"></div>
            <h2 className="not-found-subtitle">Page Not Found</h2>

            <p className="not-found-message">
              The page you're looking for doesn't exist or is still under construction.
            </p>

            <div className="not-found-log">
              <p><span className="log-prompt">$</span> locate requested_page</p>
              <p className="log-error">Error: Path not found in database</p>
              <p><span className="log-prompt">$</span> run diagnostics</p>
              <p className="log-output">Scanning... <span className="log-highlight">404 error detected</span></p>
              <p className="log-output">Possible causes:</p>
              <p className="log-output">&nbsp;&nbsp;- Page is under construction</p>
              <p className="log-output">&nbsp;&nbsp;- URL was mistyped</p>
              <p className="log-output">&nbsp;&nbsp;- Content was moved or deleted</p>
              <p><span className="log-prompt">$</span> suggest_action</p>
              <p className="log-output">Recommended: Return to <span className="log-highlight">home page</span></p>
              <p className="log-blink">_</p>
            </div>

            <Link to="/" className="not-found-button">
              Return to Home
            </Link>
          </div>
        </WindowChrome>
      </motion.div>
    </div>
  );
};

export default NotFound;
