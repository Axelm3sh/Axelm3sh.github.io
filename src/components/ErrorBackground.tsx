import React from 'react';
import './ErrorBackground.css';

interface ErrorBackgroundProps {
  className?: string;
}

const ErrorBackground: React.FC<ErrorBackgroundProps> = ({ className = '' }) => {
  return (
    <div className={`error-background ${className}`}>
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 800 600" 
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Grid lines */}
        <g className="grid-lines">
          {Array.from({ length: 20 }).map((_, i) => (
            <line 
              key={`h-${i}`} 
              x1="0" 
              y1={i * 30} 
              x2="800" 
              y2={i * 30} 
              className="grid-line"
            />
          ))}
          {Array.from({ length: 27 }).map((_, i) => (
            <line 
              key={`v-${i}`} 
              x1={i * 30} 
              y1="0" 
              x2={i * 30} 
              y2="600" 
              className="grid-line"
            />
          ))}
        </g>

        {/* Error symbols */}
        <g className="error-symbols">
          {Array.from({ length: 15 }).map((_, i) => (
            <text 
              key={`err-${i}`} 
              x={Math.random() * 750 + 25} 
              y={Math.random() * 550 + 25} 
              className="error-symbol"
              style={{ 
                fontSize: `${Math.random() * 20 + 15}px`,
                opacity: Math.random() * 0.5 + 0.5
              }}
            >
              {['!', '?', '404', 'x', '×', '⚠', '⚡', '⛔', '❌'][Math.floor(Math.random() * 9)]}
            </text>
          ))}
        </g>

        {/* Glitchy rectangles */}
        <g className="glitch-elements">
          {Array.from({ length: 8 }).map((_, i) => (
            <rect 
              key={`glitch-${i}`} 
              x={Math.random() * 700} 
              y={Math.random() * 500} 
              width={Math.random() * 100 + 50} 
              height={Math.random() * 30 + 10} 
              className="glitch-rect"
              style={{ opacity: Math.random() * 0.3 + 0.1 }}
            />
          ))}
        </g>

        {/* Matrix-like characters */}
        <g className="matrix-chars">
          {Array.from({ length: 40 }).map((_, i) => (
            <text 
              key={`matrix-${i}`} 
              x={Math.random() * 750 + 25} 
              y={Math.random() * 550 + 25} 
              className="matrix-char"
              style={{ 
                fontSize: `${Math.random() * 12 + 8}px`,
                opacity: Math.random() * 0.7 + 0.3
              }}
            >
              {String.fromCharCode(Math.floor(Math.random() * (0x30A0 - 0x3040) + 0x3040))}
            </text>
          ))}
        </g>

        {/* Central error icon */}
        <g className="error-icon" transform="translate(400, 300)">
          <circle cx="0" cy="0" r="80" className="error-circle" />
          <text x="0" y="0" textAnchor="middle" dominantBaseline="middle" className="error-text">!</text>
        </g>
      </svg>
    </div>
  );
};

export default ErrorBackground;