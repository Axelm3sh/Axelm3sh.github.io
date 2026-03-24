import { motion } from 'framer-motion';
import WindowChrome from './WindowChrome';
import BouncyBeachBall from './BouncyBeachBall';
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
      <WindowChrome title="loading...">
        <div className="loading-template__body">
          <p className="loading-template__message">{message}</p>
          <BouncyBeachBall speed={250} />
        </div>
      </WindowChrome>
    </motion.div>
  );
};

export default LoadingTemplate;
