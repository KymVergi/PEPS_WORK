'use client'

import { useState, useMemo } from 'react'
import { TrendingUp, Info, AlertTriangle, Lock } from 'lucide-react'
import { useAccount } from 'wagmi'
import { useTrading } from '@/hooks/useTrading'
import { useTokenBalance } from '@/hooks/useTokenBalance'
import styles from './TradingPanel.module.css'

// Protocol constants (mirrors UniperpHook)
const ORIGINATION_FEE_BPS = 100  // 1%
const CLOSE_FEE_BPS = 100        // 1%
const LIQUIDATION_THRESHOLD = 105 // 105%

export default function TradingPanel() {
  const { isConnected } = useAccount()
  const { openPosition, isConfirming, currentPrice, leverageUnlocked, borrowCapacity } = useTrading()
  const { ethBalance } = useTokenBalance()

  const [leverage, setLeverage] = useState<number>(2)
  const [collateralAmount, setCollateralAmount] = useState<string>('')

  // Real-time position preview calculations
  const preview = useMemo(() => {
    const collateral = parseFloat(collateralAmount) || 0
    if (collateral <= 0 || currentPrice <= 0) {
      return null
    }

    const borrowAmount = collateral * (leverage - 1)
    const originationFee = (borrowAmount * ORIGINATION_FEE_BPS) / 10000
    const effectiveCollateral = collateral - originationFee
    const totalBuyETH = effectiveCollateral + borrowAmount
    const estimatedPERP = totalBuyETH / currentPrice

    // Liq price: 1.05 × debt / holding
    const liqPrice = (LIQUIDATION_THRESHOLD * borrowAmount) / (estimatedPERP * 100)

    // Approximate health at entry: (holding × entryPrice × 100) / debt
    const health = borrowAmount > 0
      ? Math.floor((estimatedPERP * currentPrice * 100) / borrowAmount)
      : 999

    return {
      borrowAmount,
      originationFee,
      totalBuyETH,
      estimatedPERP,
      liqPrice,
      health,
      closeFeeEst: (collateral * CLOSE_FEE_BPS) / 10000,
    }
  }, [collateralAmount, leverage, currentPrice])

  const handleSubmit = async () => {
    if (!isConnected || !collateralAmount) return
    await openPosition({ collateralETH: collateralAmount, leverage })
    setCollateralAmount('')
  }

  const isButtonDisabled =
    !isConnected ||
    !collateralAmount ||
    parseFloat(collateralAmount) <= 0 ||
    parseFloat(collateralAmount) > ethBalance ||
    !leverageUnlocked ||
    isConfirming

  const healthColor = (h: number) => {
    if (h > 150) return styles.healthSafe
    if (h > 120) return styles.healthModerate
    if (h > 110) return styles.healthHigh
    return styles.healthCritical
  }

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <TrendingUp size={20} />
          Open Long Position
        </h2>
        <div className={styles.priceChip}>
          <span className={styles.priceLabel}>PEPS</span>
          <span className={styles.priceValue}>
            {currentPrice > 0 ? currentPrice.toFixed(6) : '—'} ETH
          </span>
        </div>
      </div>

      {/* Leverage unlock warning */}
      {!leverageUnlocked && (
        <div className={`${styles.warning} ${styles.warningYellow}`}>
          <Lock size={16} />
          <span>Leverage unlocks once the curve surpasses 5 ETH</span>
        </div>
      )}

      {/* Leverage Selector */}
      <div className={styles.section}>
        <label className={styles.label}>
          Leverage
          <span className={styles.leverageValue}>{leverage}x</span>
        </label>
        <div className={styles.leverageButtons}>
          {[2, 3, 4, 5].map((lev) => (
            <button
              key={lev}
              className={`${styles.leverageBtn} ${leverage === lev ? styles.active : ''}`}
              onClick={() => setLeverage(lev)}
            >
              {lev}x
            </button>
          ))}
        </div>
        {preview && (
          <p className={styles.borrowNote}>
            Borrow: {preview.borrowAmount.toFixed(4)} ETH
            · Entry fee: {preview.originationFee.toFixed(5)} ETH
          </p>
        )}
      </div>

      {/* ETH Collateral Input */}
      <div className={styles.section}>
        <label className={styles.label}>Collateral (ETH)</label>
        <div className={styles.inputGroup}>
          <input
            type="number"
            placeholder="0.00"
            value={collateralAmount}
            onChange={(e) => setCollateralAmount(e.target.value)}
            className={styles.input}
            step="0.001"
            min="0"
            disabled={isConfirming || !leverageUnlocked}
          />
          <span className={styles.assetLabel}>ETH</span>
        </div>
        <div className={styles.balance}>
          <span>Balance: {ethBalance.toFixed(5)} ETH</span>
          <button
            className={styles.maxBtn}
            onClick={() => setCollateralAmount(ethBalance.toFixed(6))}
          >
            MAX
          </button>
        </div>
        {borrowCapacity > 0 && (
          <p className={styles.capacityNote}>
            Available borrow capacity: {borrowCapacity.toFixed(4)} ETH
          </p>
        )}
      </div>

      {/* Position Preview */}
      {preview && (
        <div className={styles.calculations}>
          <div className={styles.calcRow}>
            <span className={styles.calcLabel}>Est. PERP</span>
            <span className={styles.calcValue}>{preview.estimatedPERP.toFixed(2)} PERP</span>
          </div>
          <div className={styles.calcRow}>
            <span className={styles.calcLabel}>Entry price</span>
            <span className={styles.calcValue}>{currentPrice.toFixed(6)} ETH</span>
          </div>
          <div className={styles.calcRow}>
            <span className={styles.calcLabel}>
              Liq. price
              <Info size={14} className={styles.infoIcon} />
            </span>
            <span className={`${styles.calcValue} ${styles.warning}`}>
              {preview.liqPrice.toFixed(6)} ETH
            </span>
          </div>
          <div className={styles.calcRow}>
            <span className={styles.calcLabel}>Initial health</span>
            <span className={`${styles.calcValue} ${healthColor(preview.health)}`}>
              {preview.health}%
            </span>
          </div>
          <div className={styles.calcRow}>
            <span className={styles.calcLabel}>Entry fee (1%)</span>
            <span className={styles.calcValue}>{preview.originationFee.toFixed(5)} ETH</span>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        className={`${styles.submitBtn} ${styles.submitLong}`}
        onClick={handleSubmit}
        disabled={isButtonDisabled}
      >
        {isConfirming ? (
          'Processing...'
        ) : !leverageUnlocked ? (
          <>
            <Lock size={18} />
            Leverage locked
          </>
        ) : (
          <>
            <TrendingUp size={20} />
            Open Long {leverage}x
          </>
        )}
      </button>

      {/* Warnings */}
      {!isConnected && (
        <div className={styles.warning}>
          <Info size={16} />
          <span>Connect your wallet to start trading</span>
        </div>
      )}

      {isConnected && (
        <div className={styles.warning}>
          <AlertTriangle size={16} />
          <span>
            LONG-only positions on the PEPS bonding curve.
            Liquidation at health ≤ 105%. Close fee: 1% of profit.
          </span>
        </div>
      )}
    </div>
  )
}
