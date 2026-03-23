import { useId } from 'react'
import './BouncyBeachBall.css'

interface BouncyBeachBallProps {
  duration?: number // seconds
}

export default function BouncyBeachBall({ duration = 2 }: BouncyBeachBallProps) {
  const clipId = useId()

  return (
    <div
      className="beach-ball-container"
      style={{ '--roll-duration': `${duration}s` } as React.CSSProperties}
    >
      <div className="beach-ball-travel">
        <svg
          className="beach-ball"
          viewBox="0 0 100 100"
          width="64"
          height="64"
        >
          <defs>
            <clipPath id={clipId}>
              <circle cx="50" cy="50" r="48" />
            </clipPath>
          </defs>
          <circle cx="50" cy="50" r="48" fill="#F4F0F8" stroke="#3D2E5C" strokeWidth="2.5" />
          <g clipPath={`url(#${clipId})`}>
            <path d="M50 2 A48 48 0 0 1 82 14 L50 50 Z" fill="#E97BAD" />
            <path d="M82 14 A48 48 0 0 1 98 50 L50 50 Z" fill="#F4F0F8" />
            <path d="M98 50 A48 48 0 0 1 82 86 L50 50 Z" fill="#9B8ED4" />
            <path d="M82 86 A48 48 0 0 1 50 98 L50 50 Z" fill="#F4F0F8" />
            <path d="M50 98 A48 48 0 0 1 18 86 L50 50 Z" fill="#72D4E8" />
            <path d="M18 86 A48 48 0 0 1 2 50 L50 50 Z" fill="#F4F0F8" />
            <path d="M2 50 A48 48 0 0 1 18 14 L50 50 Z" fill="#7ECFC4" />
            <path d="M18 14 A48 48 0 0 1 50 2 L50 50 Z" fill="#F4F0F8" />
          </g>
          <ellipse cx="38" cy="35" rx="14" ry="10" fill="rgba(255,255,255,0.4)" transform="rotate(-30 38 35)" />
        </svg>
      </div>
      <div className="beach-ball-shadow" />
    </div>
  )
}
