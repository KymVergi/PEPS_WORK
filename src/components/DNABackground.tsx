'use client'

import { useEffect, useRef } from 'react'
import styles from './DNABackground.module.css'

interface DNAHelix {
  x: number
  y: number
  speed: number
  rotation: number
  rotationSpeed: number
  scale: number
  opacity: number
  color1: string
  color2: string
}

export default function DNABackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    updateSize()
    window.addEventListener('resize', updateSize)

    const helixes: DNAHelix[] = []
    const numHelixes = 15

    const colors = [
      ['#00f0ff', '#c026d3'], // Cyan + Purple
      ['#00ff88', '#00f0ff'], // Green + Cyan
      ['#c026d3', '#ff0080'], // Purple + Pink
    ]

    // Create DNA helixes
    for (let i = 0; i < numHelixes; i++) {
      const colorPair = colors[Math.floor(Math.random() * colors.length)]
      
      helixes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        speed: 0.3 + Math.random() * 0.6,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: 0.02 + Math.random() * 0.03,
        scale: 0.5 + Math.random() * 0.5,
        opacity: 0.4 + Math.random() * 0.4,
        color1: colorPair[0],
        color2: colorPair[1],
      })
    }

    // Draw a single DNA helix segment
    const drawHelix = (helix: DNAHelix) => {
      ctx.save()
      ctx.translate(helix.x, helix.y)
      ctx.rotate(helix.rotation)
      ctx.scale(helix.scale, helix.scale)
      ctx.globalAlpha = helix.opacity

      const helixHeight = 120
      const helixWidth = 30
      const segments = 8

      // Draw the two strands of DNA
      for (let i = 0; i < segments; i++) {
        const t = (i / segments) * Math.PI * 2
        const y = (i / segments) * helixHeight - helixHeight / 2

        // Strand 1
        const x1 = Math.cos(t) * helixWidth
        const z1 = Math.sin(t) * helixWidth

        // Strand 2 (opposite)
        const x2 = Math.cos(t + Math.PI) * helixWidth
        const z2 = Math.sin(t + Math.PI) * helixWidth

        // Calculate depth for 3D effect
        const depth1 = (z1 + helixWidth) / (helixWidth * 2)
        const depth2 = (z2 + helixWidth) / (helixWidth * 2)

        // Draw base pair connection
        if (i < segments - 1) {
          ctx.strokeStyle = helix.color1 + '33'
          ctx.lineWidth = 1.5
          ctx.globalAlpha = helix.opacity * 0.3
          ctx.beginPath()
          ctx.moveTo(x1, y)
          ctx.lineTo(x2, y)
          ctx.stroke()
        }

        // Draw strand 1 atom
        const size1 = 3 * depth1 + 2
        ctx.globalAlpha = helix.opacity * depth1
        ctx.fillStyle = helix.color1
        ctx.shadowColor = helix.color1
        ctx.shadowBlur = 8
        ctx.beginPath()
        ctx.arc(x1, y, size1, 0, Math.PI * 2)
        ctx.fill()

        // Draw strand 2 atom
        const size2 = 3 * depth2 + 2
        ctx.globalAlpha = helix.opacity * depth2
        ctx.fillStyle = helix.color2
        ctx.shadowColor = helix.color2
        ctx.shadowBlur = 8
        ctx.beginPath()
        ctx.arc(x2, y, size2, 0, Math.PI * 2)
        ctx.fill()

        // Draw backbone connections
        if (i < segments - 1) {
          const nextT = ((i + 1) / segments) * Math.PI * 2
          const nextY = ((i + 1) / segments) * helixHeight - helixHeight / 2
          const nextX1 = Math.cos(nextT) * helixWidth
          const nextX2 = Math.cos(nextT + Math.PI) * helixWidth

          // Strand 1 backbone
          ctx.strokeStyle = helix.color1
          ctx.lineWidth = 2
          ctx.globalAlpha = helix.opacity * 0.5
          ctx.beginPath()
          ctx.moveTo(x1, y)
          ctx.lineTo(nextX1, nextY)
          ctx.stroke()

          // Strand 2 backbone
          ctx.strokeStyle = helix.color2
          ctx.beginPath()
          ctx.moveTo(x2, y)
          ctx.lineTo(nextX2, nextY)
          ctx.stroke()
        }
      }

      ctx.restore()
    }

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      helixes.forEach((helix) => {
        // Update position
        helix.y += helix.speed
        helix.rotation += helix.rotationSpeed
        
        // Reset if out of bounds
        if (helix.y > canvas.height + 100) {
          helix.y = -100
          helix.x = Math.random() * canvas.width
        }

        // Draw helix
        drawHelix(helix)
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', updateSize)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.gridOverlay} />
      <div className={styles.vignette} />
    </>
  )
}
