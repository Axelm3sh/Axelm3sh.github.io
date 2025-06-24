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
      <div className="loading-spinner">
        <div className="spinner-segment"></div>
        <div className="spinner-segment"></div>
        <div className="spinner-segment"></div>
      </div>
      <p className="loading-message">{message}</p>
    </motion.div>
  );
};

export default LoadingTemplate;