import './Divider.css';

interface DividerProps {
  className?: string;
  width?: string;
}

const Divider = ({ 
  className = '', 
  width = '50%' 
}: DividerProps) => {
  return (
    <div 
      className={`divider ${className}`}
      style={{ width }}
    ></div>
  );
};

export default Divider;