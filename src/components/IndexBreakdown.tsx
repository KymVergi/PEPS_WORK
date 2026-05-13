'use client'

import { motion } from 'framer-motion'
import { Dna, Droplet, Zap, Sparkles } from 'lucide-react'
import styles from './IndexBreakdown.module.css'

interface IndexComponent {
  name: string
  symbol: string
  weight: number
  price: number
  change24h: number
  icon: any
  color: string
}

export default function IndexBreakdown() {
  const components: IndexComponent[] = [
    {
      name: 'GLP-1 Peptides',
      symbol: 'GLP1',
      weight: 35,
      price: 436.74,
      change24h: 6.2,
      icon: Dna,
      color: '#00f0ff',
    },
    {
      name: 'BPC-157',
      symbol: 'BPC',
      weight: 25,
      price: 311.96,
      change24h: 4.8,
      icon: Droplet,
      color: '#c026d3',
    },
    {
      name: 'TB-500',
      symbol: 'TB5',
      weight: 20,
      price: 249.56,
      change24h: 5.1,
      icon: Zap,
      color: '#ff0080',
    },
    {
      name: 'Thymosin Beta',
      symbol: 'THY',
      weight: 12,
      price: 149.74,
      change24h: 7.3,
      icon: Sparkles,
      color: '#00ff88',
    },
    {
      name: 'Others',
      symbol: 'OTH',
      weight: 8,
      price: 99.82,
      change24h: 3.9,
      icon: Dna,
      color: '#ff9800',
    },
  ]

  const totalPrice = components.reduce((sum, comp) => sum + (comp.price * comp.weight / 100), 0)

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Index Breakdown</h2>
        <div className={styles.totalWeight}>
          <span className={styles.label}>Total Value</span>
          <span className={styles.value}>${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <div className={styles.grid}>
        {components.map((component, index) => {
          const Icon = component.icon
          
          return (
            <motion.div
              key={component.symbol}
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className={styles.cardHeader}>
                <div 
                  className={styles.iconWrapper}
                  style={{ background: `${component.color}22` }}
                >
                  <Icon size={24} style={{ color: component.color }} />
                </div>
                <div className={styles.weightBadge}>
                  {component.weight}%
                </div>
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.componentName}>{component.name}</h3>
                <span className={styles.componentSymbol}>{component.symbol}</span>
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.priceInfo}>
                  <span className={styles.priceLabel}>Price</span>
                  <span className={styles.priceValue}>${component.price.toFixed(2)}</span>
                </div>
                <div className={`${styles.change} ${component.change24h >= 0 ? styles.positive : styles.negative}`}>
                  {component.change24h >= 0 ? '+' : ''}{component.change24h}%
                </div>
              </div>

              {/* Weight bar */}
              <div className={styles.weightBar}>
                <motion.div
                  className={styles.weightFill}
                  style={{ backgroundColor: component.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${component.weight}%` }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                />
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Composition Chart */}
      <div className={styles.compositionChart}>
        <h3 className={styles.chartTitle}>Composition</h3>
        <div className={styles.chartBar}>
          {components.map((component, index) => (
            <motion.div
              key={component.symbol}
              className={styles.chartSegment}
              style={{
                width: `${component.weight}%`,
                backgroundColor: component.color,
              }}
              initial={{ width: 0 }}
              animate={{ width: `${component.weight}%` }}
              transition={{ delay: index * 0.05, duration: 0.6 }}
            >
              <span className={styles.segmentLabel}>{component.symbol}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
