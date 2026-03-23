import './DecorativeShapes.css'

const shapes = [
  // circles
  { type: 'circle', color: '#E97BAD', size: 18, top: '5%', left: '8%', rotate: 5, delay: 0 },
  { type: 'circle', color: '#F5A47A', size: 14, top: '75%', left: '90%', rotate: -8, delay: -2 },
  { type: 'circle', color: '#7261B8', size: 12, top: '8%', left: '60%', rotate: 10, delay: -4 },
  { type: 'circle', color: '#72D4E8', size: 16, top: '50%', left: '45%', rotate: 0, delay: -6 },
  { type: 'circle', color: '#E85C6A', size: 10, top: '92%', left: '55%', rotate: 15, delay: -8 },
  // triangles
  { type: 'triangle', color: '#9B8ED4', size: 22, top: '20%', left: '85%', rotate: -12, delay: -3 },
  { type: 'triangle', color: '#7ECFC4', size: 20, top: '40%', left: '92%', rotate: 15, delay: -5 },
  { type: 'triangle', color: '#FAE8B4', size: 24, top: '30%', left: '3%', rotate: -20, delay: -1 },
  { type: 'triangle', color: '#F0876B', size: 16, top: '68%', left: '18%', rotate: 8, delay: -7 },
  // stars
  { type: 'star', color: '#72D4E8', size: 16, top: '60%', left: '5%', rotate: 20, delay: -7 },
  { type: 'star', color: '#E85C6A', size: 15, top: '88%', left: '12%', rotate: -3, delay: -9 },
  { type: 'star', color: '#9B8ED4', size: 13, top: '15%', left: '40%', rotate: 12, delay: -2 },
  // diamonds
  { type: 'diamond', color: '#E97BAD', size: 14, top: '55%', left: '72%', rotate: 45, delay: -4 },
  { type: 'diamond', color: '#7261B8', size: 18, top: '82%', left: '38%', rotate: 30, delay: -6 },
  { type: 'diamond', color: '#FAE8B4', size: 12, top: '10%', left: '75%', rotate: 60, delay: -1 },
  // rings
  { type: 'ring', color: '#7ECFC4', size: 20, top: '35%', left: '55%', rotate: 0, delay: -3 },
  { type: 'ring', color: '#F5A47A', size: 16, top: '70%', left: '65%', rotate: 10, delay: -8 },
  // plus/cross
  { type: 'plus', color: '#E85C6A', size: 14, top: '25%', left: '22%', rotate: 15, delay: -5 },
  { type: 'plus', color: '#72D4E8', size: 18, top: '78%', left: '80%', rotate: -10, delay: -2 },
  { type: 'plus', color: '#9B8ED4', size: 12, top: '45%', left: '15%', rotate: 25, delay: -7 },
]

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
          } as React.CSSProperties}
        >
          <ShapeSvg type={s.type} color={s.color} size={s.size} />
        </div>
      ))}
    </div>
  )
}
