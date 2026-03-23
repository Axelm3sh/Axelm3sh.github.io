import { useId } from 'react'
import './Halftone.css'

const SIZE_PRESETS = {
  sm: { grid: 6, dot: 1.2 },
  md: { grid: 7, dot: 1.6 },
  lg: { grid: 12, dot: 2.8 },
  xl: { grid: 18, dot: 4 },
} as const

const COLOR_PRESETS = {
  shadow: { fill: 'rgba(60, 40, 80, 0.45)', blend: 'multiply' },
  cyan:   { fill: 'rgba(80, 200, 220, 0.5)', blend: 'multiply' },
  blush:  { fill: 'rgba(220, 80, 140, 0.4)', blend: 'multiply' },
  gold:   { fill: 'rgba(200, 140, 40, 0.45)', blend: 'multiply' },
  white:  { fill: 'rgba(255, 255, 255, 0.6)', blend: 'screen' },
  ink:    { fill: 'rgba(30, 20, 50, 0.7)', blend: 'multiply' },
} as const

export interface HalftoneProps {
  pattern?: 'dots' | 'lines' | 'crosshatch' | 'stipple'
  size?: keyof typeof SIZE_PRESETS
  color?: keyof typeof COLOR_PRESETS
  angle?: number
  opacity?: number
  className?: string
}

function PatternContent({ pattern, grid, dot, fill }: {
  pattern: string
  grid: number
  dot: number
  fill: string
}) {
  const half = grid / 2

  switch (pattern) {
    case 'lines':
      return <line x1="0" y1="0" x2="0" y2={grid} stroke={fill} strokeWidth={dot} />

    case 'crosshatch':
      return (
        <>
          <line x1="0" y1="0" x2="0" y2={grid} stroke={fill} strokeWidth={dot} />
          <line x1="0" y1="0" x2={grid} y2="0" stroke={fill} strokeWidth={dot} />
        </>
      )

    case 'stipple':
      return (
        <>
          <circle cx={half} cy={half} r={dot} fill={fill} />
          <circle cx={0} cy={0} r={dot * 0.7} fill={fill} opacity={0.5} />
          <circle cx={grid} cy={0} r={dot * 0.7} fill={fill} opacity={0.5} />
          <circle cx={0} cy={grid} r={dot * 0.7} fill={fill} opacity={0.5} />
          <circle cx={grid} cy={grid} r={dot * 0.7} fill={fill} opacity={0.5} />
        </>
      )

    default: // dots
      return <circle cx={half} cy={half} r={dot} fill={fill} />
  }
}

export default function Halftone({
  pattern = 'dots',
  size = 'sm',
  color = 'shadow',
  angle = 45,
  opacity = 1,
  className = '',
}: HalftoneProps) {
  const id = useId()
  const patternId = `ht${id}`
  const { grid, dot } = SIZE_PRESETS[size]
  const { fill, blend } = COLOR_PRESETS[color]

  return (
    <svg
      className={`halftone-layer ${className}`}
      style={{ mixBlendMode: blend as React.CSSProperties['mixBlendMode'] }}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={patternId}
          width={grid}
          height={grid}
          patternUnits="userSpaceOnUse"
          patternTransform={`rotate(${angle})`}
        >
          <PatternContent pattern={pattern} grid={grid} dot={dot} fill={fill} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${CSS.escape(patternId)})`} opacity={opacity} />
    </svg>
  )
}
