'use client'

import { useEffect, useRef } from 'react'
import styles from './PeptideMolecule.module.css'

interface Atom {
  x: number
  y: number
  z: number
  color: string
  size: number
  strand: number // 0 o 1 para doble hélice
}

export default function PeptideMolecule() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Responsive canvas size
    const updateSize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    updateSize()
    window.addEventListener('resize', updateSize)

    // Create DNA double helix structure
    const atoms: Atom[] = []
    const numPairs = 24
    const radius = 100
    const helixHeight = 400

    for (let i = 0; i < numPairs; i++) {
      const t = (i / numPairs) * Math.PI * 4 // 2 full rotations
      const y = (i / numPairs) * helixHeight - helixHeight / 2

      // Strand 1
      atoms.push({
        x: Math.cos(t) * radius,
        y: y,
        z: Math.sin(t) * radius,
        color: '#00f0ff', // Cyan
        size: 6,
        strand: 0
      })

      // Strand 2 (opposite side)
      atoms.push({
        x: Math.cos(t + Math.PI) * radius,
        y: y,
        z: Math.sin(t + Math.PI) * radius,
        color: '#c026d3', // Purple
        size: 6,
        strand: 1
      })
    }

    let rotation = 0

    const animate = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      
      ctx.clearRect(0, 0, w, h)
      
      rotation += 0.003

      // Sort atoms by z-depth for proper rendering
      const sortedAtoms = atoms.map((atom, index) => {
        const rotatedX = atom.x * Math.cos(rotation) - atom.z * Math.sin(rotation)
        const rotatedZ = atom.x * Math.sin(rotation) + atom.z * Math.cos(rotation)
        
        return {
          ...atom,
          index,
          projectedX: rotatedX + w / 2,
          projectedY: atom.y + h / 2,
          z: rotatedZ
        }
      }).sort((a, b) => a.z - b.z)

      // Draw base pairs (connections between strands)
      ctx.lineWidth = 2
      for (let i = 0; i < sortedAtoms.length - 1; i += 2) {
        const atom1 = sortedAtoms[i]
        const atom2 = sortedAtoms[i + 1]
        
        if (atom1 && atom2 && Math.abs(atom1.index - atom2.index) === 1) {
          const gradient = ctx.createLinearGradient(
            atom1.projectedX, atom1.projectedY,
            atom2.projectedX, atom2.projectedY
          )
          gradient.addColorStop(0, atom1.color + '44')
          gradient.addColorStop(1, atom2.color + '44')
          
          ctx.strokeStyle = gradient
          ctx.globalAlpha = 0.3
          ctx.beginPath()
          ctx.moveTo(atom1.projectedX, atom1.projectedY)
          ctx.lineTo(atom2.projectedX, atom2.projectedY)
          ctx.stroke()
        }
      }

      // Draw backbone connections (within same strand)
      ctx.lineWidth = 2.5
      sortedAtoms.forEach((atom, i) => {
        const nextInStrand = sortedAtoms.find(
          a => a.strand === atom.strand && a.index === atom.index + 2
        )
        
        if (nextInStrand) {
          const gradient = ctx.createLinearGradient(
            atom.projectedX, atom.projectedY,
            nextInStrand.projectedX, nextInStrand.projectedY
          )
          gradient.addColorStop(0, atom.color)
          gradient.addColorStop(1, nextInStrand.color)
          
          ctx.strokeStyle = gradient
          ctx.globalAlpha = 0.5 + (atom.z + 150) / 400
          ctx.beginPath()
          ctx.moveTo(atom.projectedX, atom.projectedY)
          ctx.lineTo(nextInStrand.projectedX, nextInStrand.projectedY)
          ctx.stroke()
        }
      })

      // Draw atoms
      sortedAtoms.forEach(atom => {
        const scale = 1 + (atom.z + 150) / 300
        const size = atom.size * scale
        const alpha = 0.6 + (atom.z + 150) / 400

        // Outer glow
        const gradient = ctx.createRadialGradient(
          atom.projectedX, atom.projectedY, 0,
          atom.projectedX, atom.projectedY, size * 3
        )
        gradient.addColorStop(0, atom.color + 'ff')
        gradient.addColorStop(0.3, atom.color + '88')
        gradient.addColorStop(1, atom.color + '00')
        
        ctx.globalAlpha = alpha * 0.4
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(atom.projectedX, atom.projectedY, size * 3, 0, Math.PI * 2)
        ctx.fill()

        // Core atom
        ctx.globalAlpha = alpha
        ctx.fillStyle = atom.color
        ctx.beginPath()
        ctx.arc(atom.projectedX, atom.projectedY, size, 0, Math.PI * 2)
        ctx.fill()

        // Inner highlight
        ctx.globalAlpha = alpha * 0.6
        ctx.fillStyle = '#ffffff'
        ctx.beginPath()
        ctx.arc(atom.projectedX - size * 0.3, atom.projectedY - size * 0.3, size * 0.4, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', updateSize)
    }
  }, [])

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.scanline} />
    </div>
  )
}
