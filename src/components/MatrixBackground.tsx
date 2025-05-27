import { useEffect, useRef } from 'react'
import './MatrixBackground.css'

const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas dimensions to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Matrix characters
    const characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789'
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    
    // Array to track the y position of each column
    const drops: number[] = []
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -100) // Start above the canvas
    }

    // Drawing the characters
    const draw = () => {
      // Semi-transparent black background to create trail effect
      ctx.fillStyle = 'rgba(26, 26, 46, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#0f3460' // Base color
      ctx.font = `${fontSize}px monospace`

      // Loop through each drop
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = characters.charAt(Math.floor(Math.random() * characters.length))
        
        // Highlight some characters for visual interest
        if (Math.random() > 0.98) {
          ctx.fillStyle = '#e94560' // Highlight color
        } else {
          ctx.fillStyle = '#0f3460' // Base color
        }

        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        // Move the drop down
        drops[i]++

        // Reset when drop reaches bottom or randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0
        }
      }
    }

    // Animation loop
    const interval = setInterval(draw, 33) // ~30fps

    // Cleanup
    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="matrix-background" />
}

export default MatrixBackground