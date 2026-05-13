'use client'

import { motion } from 'framer-motion'
import { Coins, TrendingUp, Activity, Database } from 'lucide-react'
import { useAccount } from 'wagmi'
import { useStaking } from '@/hooks/useStaking'
import { useTrading } from '@/hooks/useTrading'
import styles from './StakingStats.module.css'

export default function StakingStats() {
  const { isConnected } = useAccount()
  const { stakedPERP, pendingETH, claimableETH, totalStakedProtocol, claimRewards, isConfirming } = useStaking()
  const { curveLevel, currentPrice } = useTrading()

  const totalRewards = pendingETH + claimableETH

  const statsData = [
    {
      icon: Database,
      label: 'Total PEPS Staked',
      value: totalStakedProtocol > 0
        ? `${(totalStakedProtocol / 1000).toFixed(1)}K PEPS`
        : '—',
      color: '#00f0ff',
    },
    {
      icon: Activity,
      label: 'Curve Level',
      value: curveLevel > 0 ? `${curveLevel.toFixed(4)} ETH` : '—',
      color: '#00ff88',
    },
    {
      icon: TrendingUp,
      label: 'PEPS Price',
      value: currentPrice > 0 ? `${currentPrice.toFixed(6)} ETH` : '—',
      color: '#c026d3',
    },
    {
      icon: Coins,
      label: 'Your Rewards',
      value: isConnected ? `${totalRewards.toFixed(6)} ETH` : '—',
      color: '#ff9800',
    },
  ]

  return (
    <div className={styles.container}>
      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        {statsData.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              className={styles.statCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div
                className={styles.iconWrapper}
                style={{ background: `${stat.color}22` }}
              >
                <Icon size={24} style={{ color: stat.color }} />
              </div>
              <div className={styles.statContent}>
                <span className={styles.statLabel}>{stat.label}</span>
                <span className={styles.statValue}>{stat.value}</span>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* User staking summary */}
      {isConnected && (
        <motion.div
          className={styles.userCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className={styles.userHeader}>
            <h3 className={styles.userTitle}>Your Staking</h3>
          </div>

          <div className={styles.userStats}>
            <div className={styles.userStatItem}>
              <span className={styles.userStatLabel}>PEPS Stakeado</span>
              <span className={styles.userStatValue}>
                {stakedPERP.toLocaleString(undefined, { maximumFractionDigits: 2 })} PEPS
              </span>
            </div>
            <div className={styles.userStatItem}>
              <span className={styles.userStatLabel}>Recompensas pendientes</span>
              <span className={`${styles.userStatValue} ${styles.rewards}`}>
                {pendingETH.toFixed(6)} ETH
              </span>
            </div>
            <div className={styles.userStatItem}>
              <span className={styles.userStatLabel}>ETH reclamable</span>
              <span className={`${styles.userStatValue} ${styles.rewards}`}>
                {claimableETH.toFixed(6)} ETH
              </span>
            </div>
          </div>

          {totalRewards > 0 && (
            <button
              className={styles.claimBtn}
              onClick={claimRewards}
              disabled={isConfirming}
            >
              <Coins size={18} />
              {isConfirming ? 'Procesando...' : `Reclamar ${totalRewards.toFixed(6)} ETH`}
            </button>
          )}
        </motion.div>
      )}

      {/* Fee info */}
      <motion.div
        className={styles.feeCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <h3 className={styles.feeTitle}>Distribución de Comisiones</h3>
        <div className={styles.feeList}>
          {[
            { label: 'Fee de apertura', value: '1% del borrow', color: '#00f0ff' },
            { label: 'Fee de cierre', value: '1% del profit', color: '#00ff88' },
            { label: 'Fee LP (spot)', value: '1% por swap', color: '#c026d3' },
          ].map((fee) => (
            <div key={fee.label} className={styles.feeItem}>
              <span className={styles.feeName}>{fee.label}</span>
              <span className={styles.feeValue} style={{ color: fee.color }}>
                {fee.value}
              </span>
            </div>
          ))}
        </div>
        <p className={styles.feeNote}>
          Los stakers reciben los fees de apertura y cierre en ETH, en proporción a su stake.
          No hay período de lock ni penalización por salida.
        </p>
      </motion.div>
    </div>
  )
}
