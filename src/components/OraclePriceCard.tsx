'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Activity, Zap, AlertCircle } from 'lucide-react'
import { useTrading } from '@/hooks/useTrading'
import styles from './OraclePriceCard.module.css'

// Bonding curve: P(E) = (V + E)² / K
// V = 10 ETH, K = 10M
const VIRTUAL_ETH = 10
const K = 10_000_000
const MAX_CURVE_LEVEL = 1500

function calcPrice(curveLevel: number): number {
  return ((VIRTUAL_ETH + curveLevel) ** 2) / K
}

export default function OraclePriceCard() {
  const { currentPrice, twapPrice, curveLevel, borrowCapacity, leverageUnlocked } = useTrading()

  // Progress along the curve (0 → 1500 ETH total)
  const curveProgress = Math.min((curveLevel / MAX_CURVE_LEVEL) * 100, 100)

  // Approximate price at 50% curve level for reference
  const priceAt50pct = calcPrice(MAX_CURVE_LEVEL * 0.5)

  const twapDiff = currentPrice > 0 && twapPrice > 0
    ? ((currentPrice - twapPrice) / twapPrice) * 100
    : 0

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
            <h1 className={styles.title}>PEPS Bonding Curve</h1>
            <p className={styles.subtitle}>
              P(E) = (10 + E)² / 10,000,000 · price in ETH per PERP
            </p>
          </div>
        </div>
        <div className={`${styles.statusChip} ${leverageUnlocked ? styles.unlocked : styles.locked}`}>
          {leverageUnlocked ? (
            <><Zap size={14} /> Leverage active</>
          ) : (
            <><AlertCircle size={14} /> Leverage locked</>
          )}
        </div>
      </div>

      {/* Current price */}
      <div className={styles.priceSection}>
        <div className={styles.mainPrice}>
          <span className={styles.price}>
            {currentPrice > 0 ? currentPrice.toFixed(8) : '—'}
          </span>
          <span className={styles.currency}>ETH / PERP</span>
        </div>
        {twapPrice > 0 && (
          <div className={`${styles.change} ${twapDiff >= 0 ? styles.positive : styles.negative}`}>
            <TrendingUp size={16} />
            <span>
              TWAP: {twapPrice.toFixed(8)} ETH
              ({twapDiff >= 0 ? '+' : ''}{twapDiff.toFixed(2)}%)
            </span>
          </div>
        )}
      </div>

      {/* Curve progress bar */}
      <div className={styles.curveSection}>
        <div className={styles.curveHeader}>
          <span className={styles.curveLabel}>Curve Level</span>
          <span className={styles.curveValue}>
            {curveLevel.toFixed(4)} ETH / {MAX_CURVE_LEVEL} ETH
          </span>
        </div>
        <div className={styles.progressBar}>
          <motion.div
            className={styles.progressFill}
            initial={{ width: 0 }}
            animate={{ width: `${curveProgress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
          {/* Leverage unlock marker at ~0.33% (5/1500) */}
          <div
            className={styles.leverageMarker}
            style={{ left: `${(5 / MAX_CURVE_LEVEL) * 100}%` }}
            title="Leverage unlocks here (5 ETH)"
          />
        </div>
        <div className={styles.progressLabels}>
          <span>0 ETH</span>
          <span>▲ Leverage unlock (5 ETH)</span>
          <span>{MAX_CURVE_LEVEL} ETH</span>
        </div>
      </div>

      {/* Stats */}
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Current level</span>
          <span className={styles.statValue}>{curveLevel.toFixed(4)} ETH</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Borrow cap.</span>
          <span className={styles.statValue}>
            {borrowCapacity > 0 ? `${borrowCapacity.toFixed(4)} ETH` : '—'}
          </span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Price @50%</span>
          <span className={styles.statValue}>{priceAt50pct.toFixed(6)} ETH</span>
        </div>
      </div>

      <div className={styles.pulseEffect} />
    </motion.div>
  )
}
