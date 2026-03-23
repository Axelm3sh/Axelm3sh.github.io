import './WindowChrome.css'

interface WindowChromeProps {
  title?: string
  children: React.ReactNode
  className?: string
}

export default function WindowChrome({ title = 'untitled', children, className = '' }: WindowChromeProps) {
  return (
    <div className={`window-chrome ${className}`}>
      <div className="window-chrome__titlebar">
        <div className="window-chrome__dots">
          <span className="window-chrome__dot window-chrome__dot--close" />
          <span className="window-chrome__dot window-chrome__dot--minimize" />
          <span className="window-chrome__dot window-chrome__dot--maximize" />
        </div>
        <span className="window-chrome__title">{title}</span>
      </div>
      <div className="window-chrome__body">
        {children}
      </div>
    </div>
  )
}
