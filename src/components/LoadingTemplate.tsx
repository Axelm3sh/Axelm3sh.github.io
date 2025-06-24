import { motion } from 'framer-motion';
import './LoadingTemplate.css';

interface LoadingTemplateProps {
  message?: string;
  className?: string;
}

const LoadingTemplate = ({ 
  message = 'Loading...', 
  className = '' 
}: LoadingTemplateProps) => {
  return (
    <motion.div 
      className={`loading-template ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="terminal-container">
        <div className="terminal-header">
          <span className="terminal-dot"></span>
          <span className="terminal-dot"></span>
          <span className="terminal-dot"></span>
          <span className="terminal-title">loading_process.sh</span>
        </div>
        <div className="terminal-body">
          <p><span className="terminal-prompt">$</span> initialize_content</p>
          <p className="terminal-output">Preparing resources...</p>
          <p><span className="terminal-prompt">$</span> check_status</p>
          <p className="terminal-output">Status: <span className="terminal-highlight">In Progress</span></p>
          <p><span className="terminal-prompt">$</span> display_message</p>
          <p className="terminal-output">{message}</p>
          <p className="terminal-blink">_</p>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingTemplate;
