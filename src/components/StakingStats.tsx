'use client'

import { motion } from 'framer-motion'
import { Lock, TrendingUp, Users, Coins } from 'lucide-react'
import styles from './StakingStats.module.css'

export default function StakingStats() {
  // Mock data
  const stats = {
    totalStaked: 42500000,
    totalStakers: 3847,
    averageApy: 25.5,
    yourStaked: 8500.00,
    yourRewards: 156.42,
    nextReward: '2d 14h',
  }

  const statsData = [
    {
      icon: Lock,
      label: 'Total Value Locked',
      value: `$${(stats.totalStaked / 1000000).toFixed(1)}M`,
      color: '#00f0ff',
    },
    {
      icon: TrendingUp,
      label: 'Average APY',
      value: `${stats.averageApy}%`,
      color: '#00ff88',
    },
    {
      icon: Users,
      label: 'Total Stakers',
      value: stats.totalStakers.toLocaleString(),
      color: '#c026d3',
    },
    {
      icon: Coins,
      label: 'Your Rewards',
      value: `${stats.yourRewards.toFixed(2)} PEPS`,
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

      {/* Your Staking Info */}
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
            <span className={styles.userStatLabel}>Staked Amount</span>
            <span className={styles.userStatValue}>
              {stats.yourStaked.toLocaleString()} PEPS
            </span>
          </div>
          <div className={styles.userStatItem}>
            <span className={styles.userStatLabel}>Earned Rewards</span>
            <span className={`${styles.userStatValue} ${styles.rewards}`}>
              {stats.yourRewards.toFixed(2)} PEPS
            </span>
          </div>
          <div className={styles.userStatItem}>
            <span className={styles.userStatLabel}>Next Reward In</span>
            <span className={styles.userStatValue}>
              {stats.nextReward}
            </span>
          </div>
        </div>

        <button className={styles.claimBtn}>
          <Coins size={18} />
          Claim Rewards
        </button>
      </motion.div>

      {/* APY Tiers Info */}
      <motion.div
        className={styles.apyCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <h3 className={styles.apyTitle}>APY by Lock Period</h3>
        <div className={styles.apyList}>
          {[
            { period: '30 days', apy: '12.5%' },
            { period: '90 days', apy: '18.0%' },
            { period: '180 days', apy: '25.0%' },
            { period: '365 days', apy: '35.0%' },
          ].map((tier, index) => (
            <div key={tier.period} className={styles.apyItem}>
              <span className={styles.apyPeriod}>{tier.period}</span>
              <div className={styles.apyBar}>
                <motion.div
                  className={styles.apyFill}
                  initial={{ width: 0 }}
                  animate={{ width: `${parseFloat(tier.apy) * 2}%` }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                />
              </div>
              <span className={styles.apyValue}>{tier.apy}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
