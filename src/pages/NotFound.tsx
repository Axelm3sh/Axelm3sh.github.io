import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ErrorBackground from '../components/ErrorBackground';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <ErrorBackground className="not-found-background" />

      <motion.div
        className="not-found-content card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="not-found-title">404</h1>
        <div className="not-found-divider"></div>
        <h2 className="not-found-subtitle">Page Not Found</h2>

        <p className="not-found-message">
          The page you're looking for doesn't exist or is still under construction.
        </p>

        <div className="not-found-terminal">
          <div className="terminal-header">
            <span className="terminal-dot"></span>
            <span className="terminal-dot"></span>
            <span className="terminal-dot"></span>
            <span className="terminal-title">system_error.log</span>
          </div>
          <div className="terminal-body">
            <p><span className="terminal-prompt">$</span> locate requested_page</p>
            <p className="terminal-error">Error: Path not found in database</p>
            <p><span className="terminal-prompt">$</span> run diagnostics</p>
            <p className="terminal-output">Scanning system... <span className="terminal-highlight">404 error detected</span></p>
            <p className="terminal-output">Possible causes:</p>
            <p className="terminal-output">- Page is under construction</p>
            <p className="terminal-output">- URL was mistyped</p>
            <p className="terminal-output">- Content was moved or deleted</p>
            <p><span className="terminal-prompt">$</span> suggest_action</p>
            <p className="terminal-output">Recommended: Return to <span className="terminal-highlight">home page</span></p>
            <p className="terminal-blink">_</p>
          </div>
        </div>

        <Link to="/" className="not-found-button">
          Return to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;