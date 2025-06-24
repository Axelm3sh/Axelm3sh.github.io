import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const HEX_SIZE = 60; // size of one hex
const ROWS = 5;
const COLS = 13; // Increased from 12 to 13 to add more hexagons horizontally

interface BannerHexTrianglesProps {
  // Optional props for customization
  animationSpeed?: number;
  pulseIntensity?: number;
}

const BannerHexTriangles: React.FC<BannerHexTrianglesProps> = ({
  animationSpeed = 1,
  pulseIntensity = 0.8,
}) => {
  // State for wave animation
  const [wavePhase, setWavePhase] = useState(0);

  // Simple red and blue color palette
  const colors = {
    primary: "var(--primary)",
    secondary: "var(--secondary)",
    accent: "var(--accent)",
    highlight: "var(--highlight)",
  };

  // Generate hexagon points
  const hexagonPoints = (cx: number, cy: number, size: number) => {
    return Array.from({ length: 6 })
      .map((_, i) => {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const x = cx + size * Math.cos(angle);
        const y = cy + size * Math.sin(angle);
        return `${x},${y}`;
      })
      .join(" ");
  };

  // Get color based on position and wave phase
  const getHexColor = (row: number, col: number) => {
    // Calculate a value based on position and wave phase
    const distance = Math.sqrt(Math.pow(row - ROWS/2, 2) + Math.pow(col - COLS/2, 2));
    const waveValue = Math.sin(distance * 0.5 + wavePhase) * 0.5 + 0.5;

    // Use the wave value to determine color intensity
    if (waveValue > 0.7) {
      return colors.highlight; // More intense color for wave peaks
    } else if (waveValue > 0.4) {
      return colors.accent;    // Medium intensity
    } else {
      return colors.secondary; // Less intense color for wave troughs
    }
  };

  // Gradient definitions
  const gradients = {
    main: "waveGradient",
    glow: "hexGlow",
  };

  // Wave animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setWavePhase(prevPhase => (prevPhase + 0.1 * animationSpeed) % (Math.PI * 2));
    }, 50);

    return () => clearInterval(interval);
  }, [animationSpeed]);

  return (
    <motion.svg
      width="100%"
      height={HEX_SIZE * ROWS * 0.95} // Increased height scaling factor from 0.85 to 0.95
      viewBox={`0 0 ${HEX_SIZE * COLS * 0.95} ${HEX_SIZE * ROWS * 0.98}`} // Increased viewBox scaling factors
      style={{
        display: "block",
        maxWidth: "100vw",
        background: colors.primary,
        borderRadius: "1em",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <defs>
        {/* Main gradient for the red and blue scheme */}
        <linearGradient id={gradients.main} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={colors.accent} />
          <stop offset="50%" stopColor={colors.secondary} />
          <stop offset="100%" stopColor={colors.highlight} />
        </linearGradient>

        {/* Glow effect for pulsing hexes */}
        <filter id={gradients.glow} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Hexagon grid */}
      {Array.from({ length: ROWS }).map((_, row) =>
        Array.from({ length: COLS }).map((_, col) => {
          // Offset every other row for hex tessellation
          const x =
            col * HEX_SIZE * 0.90 + (row % 2 === 0 ? HEX_SIZE * 0.45 : 0); // Adjusted spacing for better coverage
          const y = row * HEX_SIZE * 0.78; // Slightly increased vertical spacing

          const hexKey = `${row}-${col}`;

          // Calculate a pulse effect based on position and wave phase
          const distance = Math.sqrt(Math.pow(row - ROWS/2, 2) + Math.pow(col - COLS/2, 2));
          const pulseValue = Math.sin(distance * 0.5 + wavePhase) * 0.5 + 0.5;
          const isPulsing = pulseValue > 0.7;

          // Determine if this hex should use gradient or solid color
          const shouldGradient = (row + col) % 2 === 0;
          const fill = shouldGradient
            ? `url(#${gradients.main})`
            : getHexColor(row, col);

          return (
            <motion.polygon
              key={hexKey}
              points={hexagonPoints(x, y, HEX_SIZE / 1.9)} // Slightly increased hexagon size
              fill={fill}
              opacity={isPulsing ? 0.95 : 0.85}
              filter={isPulsing ? `url(#${gradients.glow})` : undefined}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ 
                scale: isPulsing ? 1.05 : 1,
                opacity: isPulsing ? 0.95 : 0.85,
              }}
              transition={{ 
                duration: 0.5,
                delay: (row * COLS + col) * 0.01 / animationSpeed
              }}
            />
          );
        })
      )}
    </motion.svg>
  );
};

export default BannerHexTriangles;