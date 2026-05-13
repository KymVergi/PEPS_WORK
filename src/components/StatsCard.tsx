'use client'

import { motion } from 'framer-motion'
import styles from './StatsCard.module.css'

interface StatsCardProps {
  label: string
  value: string
  change?: string
  index: number
}

export default function StatsCard({ label, value, change, index }: StatsCardProps) {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <div className={styles.content}>
        <p className={styles.label}>{label}</p>
        <h3 className={styles.value}>{value}</h3>
        {change && (
          <span className={`${styles.change} ${parseFloat(change) >= 0 ? styles.positive : styles.negative}`}>
            {parseFloat(change) >= 0 ? '+' : ''}{change}
          </span>
        )}
      </div>
      <div className={styles.glow} />
    </motion.div>
  )
}
