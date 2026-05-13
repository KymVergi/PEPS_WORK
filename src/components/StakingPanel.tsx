'use client'

import { useState } from 'react'
import { Lock, Unlock, Info } from 'lucide-react'
import styles from './StakingPanel.module.css'

type StakingAction = 'stake' | 'unstake'

export default function StakingPanel() {
  const [action, setAction] = useState<StakingAction>('stake')
  const [amount, setAmount] = useState<string>('')
  const [lockPeriod, setLockPeriod] = useState<number>(30)

  // Mock data
  const pepsBalance = 15420.50
  const stakedBalance = 8500.00
  const pepsPrice = 0.85

  const lockPeriods = [
    { days: 30, apy: 12.5 },
    { days: 90, apy: 18.0 },
    { days: 180, apy: 25.0 },
    { days: 365, apy: 35.0 },
  ]

  const maxAmount = action === 'stake' ? pepsBalance : stakedBalance
  const selectedAPY = lockPeriods.find(p => p.days === lockPeriod)?.apy || 0

  const handleSubmit = () => {
    console.log('Staking action:', { action, amount, lockPeriod })
    // Aquí se conectará con el smart contract
  }

  const handleMaxClick = () => {
    setAmount(maxAmount.toString())
  }

  const estimatedRewards = amount 
    ? (parseFloat(amount) * selectedAPY / 100 * lockPeriod / 365).toFixed(2)
    : '0.00'

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          {action === 'stake' ? 'Stake $PEPS' : 'Unstake $PEPS'}
        </h2>
      </div>

      {/* Action Toggle */}
      <div className={styles.actionToggle}>
        <button
          className={`${styles.toggleBtn} ${action === 'stake' ? styles.activeStake : ''}`}
          onClick={() => setAction('stake')}
        >
          <Lock size={20} />
          Stake
        </button>
        <button
          className={`${styles.toggleBtn} ${action === 'unstake' ? styles.activeUnstake : ''}`}
          onClick={() => setAction('unstake')}
        >
          <Unlock size={20} />
          Unstake
        </button>
      </div>

      {/* Lock Period (only for staking) */}
      {action === 'stake' && (
        <div className={styles.section}>
          <label className={styles.label}>
            Lock Period
            <span className={styles.apyBadge}>{selectedAPY}% APY</span>
          </label>
          <div className={styles.periodButtons}>
            {lockPeriods.map((period) => (
              <button
                key={period.days}
                className={`${styles.periodBtn} ${lockPeriod === period.days ? styles.active : ''}`}
                onClick={() => setLockPeriod(period.days)}
              >
                <span className={styles.periodDays}>{period.days}</span>
                <span className={styles.periodLabel}>days</span>
                <span className={styles.periodApy}>{period.apy}%</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Amount Input */}
      <div className={styles.section}>
        <label className={styles.label}>Amount</label>
        <div className={styles.inputWrapper}>
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={styles.input}
            step="0.01"
            min="0"
            max={maxAmount}
          />
          <div className={styles.inputSuffix}>
            <span className={styles.assetSymbol}>PEPS</span>
          </div>
        </div>
        <div className={styles.balance}>
          <span>
            {action === 'stake' ? 'Available' : 'Staked'}: {maxAmount.toLocaleString()} PEPS
          </span>
          <button className={styles.maxBtn} onClick={handleMaxClick}>
            MAX
          </button>
        </div>
        {amount && (
          <div className={styles.usdValue}>
            ≈ ${(parseFloat(amount) * pepsPrice).toFixed(2)} USD
          </div>
        )}
      </div>

      {/* Estimated Rewards */}
      {action === 'stake' && amount && (
        <div className={styles.rewardsCard}>
          <div className={styles.rewardsRow}>
            <span className={styles.rewardsLabel}>Estimated Rewards</span>
            <span className={styles.rewardsValue}>
              {estimatedRewards} PEPS
            </span>
          </div>
          <div className={styles.rewardsRow}>
            <span className={styles.rewardsLabel}>Lock Until</span>
            <span className={styles.rewardsValue}>
              {new Date(Date.now() + lockPeriod * 24 * 60 * 60 * 1000).toLocaleDateString()}
            </span>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        className={`${styles.submitBtn} ${action === 'stake' ? styles.submitStake : styles.submitUnstake}`}
        onClick={handleSubmit}
        disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > maxAmount}
      >
        {action === 'stake' ? (
          <>
            <Lock size={20} />
            Stake PEPS
          </>
        ) : (
          <>
            <Unlock size={20} />
            Unstake PEPS
          </>
        )}
      </button>

      {/* Info */}
      {action === 'unstake' && (
        <div className={styles.warning}>
          <Info size={16} />
          <span>
            Unstaking has a 7-day cooldown period. Your tokens will be available after this period.
          </span>
        </div>
      )}
    </div>
  )
}
