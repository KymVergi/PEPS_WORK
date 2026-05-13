'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Activity, Clock } from 'lucide-react'
import styles from './OraclePriceCard.module.css'

export default function OraclePriceCard() {
  // Mock data
  const oracleData = {
    currentPrice: 1247.82,
    change24h: 72.45,
    changePercent: 5.8,
    high24h: 1265.30,
    low24h: 1175.37,
    lastUpdate: new Date().toLocaleTimeString(),
    volume24h: 28900000,
  }

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <Activity className={styles.icon} size={32} />
          <div>
            <h1 className={styles.title}>Peptide Oracle Index</h1>
            <p className={styles.subtitle}>Real-time biomarker aggregated pricing</p>
          </div>
        </div>
        <div className={styles.updateTime}>
          <Clock size={16} />
          <span>Last update: {oracleData.lastUpdate}</span>
        </div>
      </div>

      <div className={styles.priceSection}>
        <div className={styles.mainPrice}>
          <span className={styles.currency}>$</span>
          <span className={styles.price}>{oracleData.currentPrice.toFixed(2)}</span>
        </div>
        <div className={`${styles.change} ${oracleData.changePercent >= 0 ? styles.positive : styles.negative}`}>
          <TrendingUp size={20} />
          <span className={styles.changeValue}>
            {oracleData.changePercent >= 0 ? '+' : ''}{oracleData.changePercent}%
          </span>
          <span className={styles.changeAmount}>
            ({oracleData.changePercent >= 0 ? '+' : ''}${oracleData.change24h.toFixed(2)})
          </span>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>24h High</span>
          <span className={styles.statValue}>${oracleData.high24h.toFixed(2)}</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statLabel}>24h Low</span>
          <span className={styles.statValue}>${oracleData.low24h.toFixed(2)}</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statLabel}>24h Volume</span>
          <span className={styles.statValue}>${(oracleData.volume24h / 1000000).toFixed(1)}M</span>
        </div>
      </div>

      <div className={styles.pulseEffect} />
    </motion.div>
  )
}
