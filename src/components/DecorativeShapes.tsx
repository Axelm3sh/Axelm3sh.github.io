import { useRef } from 'react'
import './DecorativeShapes.css'

const shapeTemplates = [
  { type: 'circle', color: '#E97BAD', size: 18 },
  { type: 'circle', color: '#F5A47A', size: 14 },
  { type: 'circle', color: '#7261B8', size: 12 },
  { type: 'circle', color: '#72D4E8', size: 16 },
  { type: 'circle', color: '#E85C6A', size: 10 },
  { type: 'triangle', color: '#9B8ED4', size: 22 },
  { type: 'triangle', color: '#7ECFC4', size: 20 },
  { type: 'triangle', color: '#FAE8B4', size: 24 },
  { type: 'triangle', color: '#F0876B', size: 16 },
  { type: 'star', color: '#72D4E8', size: 16 },
  { type: 'star', color: '#E85C6A', size: 15 },
  { type: 'star', color: '#9B8ED4', size: 13 },
  { type: 'diamond', color: '#E97BAD', size: 14 },
  { type: 'diamond', color: '#7261B8', size: 18 },
  { type: 'diamond', color: '#FAE8B4', size: 12 },
  { type: 'ring', color: '#7ECFC4', size: 20 },
  { type: 'ring', color: '#F5A47A', size: 16 },
  { type: 'plus', color: '#E85C6A', size: 14 },
  { type: 'plus', color: '#72D4E8', size: 18 },
  { type: 'plus', color: '#9B8ED4', size: 12 },
]

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function generateShapes() {
  return shapeTemplates.map((t) => ({
    ...t,
    top: `${randomBetween(3, 95)}%`,
    left: `${randomBetween(3, 95)}%`,
    rotate: Math.round(randomBetween(-180, 180)),
    delay: Math.round(randomBetween(-10, 0)),
    driftX: Math.round(randomBetween(-25, 25)),
    driftY: Math.round(randomBetween(-20, 20)),
    duration: +(randomBetween(7, 14)).toFixed(1),
  }))
}

function ShapeSvg({ type, color, size }: { type: string; color: string; size: number }) {
  if (type === 'circle') {
    return (
      <svg width={size} height={size} viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="9" fill={color} />
      </svg>
    )
  }
  if (type === 'triangle') {
    return (
      <svg width={size} height={size} viewBox="0 0 20 20">
        <polygon points="10,1 19,18 1,18" fill={color} />
      </svg>
    )
  }
  if (type === 'diamond') {
    return (
      <svg width={size} height={size} viewBox="0 0 20 20">
        <polygon points="10,1 19,10 10,19 1,10" fill={color} />
      </svg>
    )
  }
  if (type === 'ring') {
    return (
      <svg width={size} height={size} viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="8" fill="none" stroke={color} strokeWidth="2.5" />
      </svg>
    )
  }
  if (type === 'plus') {
    return (
      <svg width={size} height={size} viewBox="0 0 20 20">
        <rect x="8" y="2" width="4" height="16" rx="1" fill={color} />
        <rect x="2" y="8" width="16" height="4" rx="1" fill={color} />
      </svg>
    )
  }
  // star
  return (
    <svg width={size} height={size} viewBox="0 0 20 20">
      <polygon points="10,1 12.5,7.5 19,8 14,12.5 15.5,19 10,15.5 4.5,19 6,12.5 1,8 7.5,7.5" fill={color} />
    </svg>
  )
}

export default function DecorativeShapes() {
  const shapesRef = useRef<ReturnType<typeof generateShapes> | null>(null)
  if (!shapesRef.current) {
    shapesRef.current = generateShapes()
  }
  const shapes = shapesRef.current

  return (
    <div className="decorative-shapes" aria-hidden="true">
      {shapes.map((s, i) => (
        <div
          key={i}
          className="decorative-shape"
          style={{
            top: s.top,
            left: s.left,
            '--shape-rotate': `${s.rotate}deg`,
            '--shape-delay': `${s.delay}s`,
            '--shape-drift-x': `${s.driftX}px`,
            '--shape-drift-y': `${s.driftY}px`,
            '--shape-duration': `${s.duration}s`,
          } as React.CSSProperties}
        >
          <ShapeSvg type={s.type} color={s.color} size={s.size} />
        </div>
      ))}
    </div>
  )
}
