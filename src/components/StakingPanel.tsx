'use client'

import { useState } from 'react'
import { Lock, Unlock, Coins, Info } from 'lucide-react'
import { useAccount } from 'wagmi'
import { useStaking } from '@/hooks/useStaking'
import { useTokenBalance } from '@/hooks/useTokenBalance'
import styles from './StakingPanel.module.css'

type StakingAction = 'stake' | 'unstake'

export default function StakingPanel() {
  const { isConnected } = useAccount()
  const { stakedPERP, pendingETH, claimableETH, stake, unstake, claimRewards, isConfirming } = useStaking()
  const { pepsBalance } = useTokenBalance()

  const [action, setAction] = useState<StakingAction>('stake')
  const [amount, setAmount] = useState<string>('')

  const maxAmount = action === 'stake' ? pepsBalance : stakedPERP
  const totalRewards = pendingETH + claimableETH

  const handleSubmit = async () => {
    if (!amount || parseFloat(amount) <= 0) return
    if (action === 'stake') {
      await stake(amount)
    } else {
      await unstake(amount)
    }
    setAmount('')
  }

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          {action === 'stake' ? (
            <><Lock size={20} /> Stake $PEPS</>
          ) : (
            <><Unlock size={20} /> Unstake $PEPS</>
          )}
        </h2>
      </div>

      {/* Stake / Unstake Toggle */}
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
            step="1"
            min="0"
            max={maxAmount}
            disabled={isConfirming || !isConnected}
          />
          <span className={styles.inputSuffix}>PEPS</span>
        </div>
        <div className={styles.balance}>
          <span>
            {action === 'stake' ? 'Available' : 'Staked'}:{' '}
            {maxAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} PEPS
          </span>
          <button className={styles.maxBtn} onClick={() => setAmount(maxAmount.toString())}>
            MAX
          </button>
        </div>
      </div>

      {/* Rewards card */}
      {isConnected && totalRewards > 0 && (
        <div className={styles.rewardsCard}>
          <div className={styles.rewardsRow}>
            <span className={styles.rewardsLabel}>
              <Coins size={15} />
              Pending rewards
            </span>
            <span className={styles.rewardsValue}>{totalRewards.toFixed(6)} ETH</span>
          </div>
          <button
            className={styles.claimBtn}
            onClick={claimRewards}
            disabled={isConfirming}
          >
            <Coins size={16} />
            {isConfirming ? 'Processing...' : 'Claim ETH'}
          </button>
        </div>
      )}

      {/* Submit */}
      <button
        className={`${styles.submitBtn} ${action === 'stake' ? styles.submitStake : styles.submitUnstake}`}
        onClick={handleSubmit}
        disabled={!isConnected || !amount || parseFloat(amount) <= 0 || parseFloat(amount) > maxAmount || isConfirming}
      >
        {isConfirming ? (
          'Processing...'
        ) : action === 'stake' ? (
          <><Lock size={20} /> Stake PEPS</>
        ) : (
          <><Unlock size={20} /> Unstake PEPS</>
        )}
      </button>

      {/* Info */}
      <div className={styles.infoBox}>
        <Info size={15} />
        <span>
          By staking PEPS you earn a share of the position open and close fees
          (1% each), paid in ETH. No lock period required.
        </span>
      </div>
    </div>
  )
}
