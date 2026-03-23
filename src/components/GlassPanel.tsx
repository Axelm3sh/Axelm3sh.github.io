import './GlassPanel.css'
import Halftone from './Halftone'
import type { HalftoneProps } from './Halftone'

interface GlassPanelProps {
  children: React.ReactNode
  className?: string
  halftone?: HalftoneProps
}

export default function GlassPanel({ children, className = '', halftone }: GlassPanelProps) {
  return (
    <div className={`glass-panel ${className}`}>
      {halftone && <Halftone {...halftone} />}
      {children}
    </div>
  )
}
