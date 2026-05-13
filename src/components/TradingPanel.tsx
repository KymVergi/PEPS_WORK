'use client'

import { useState, useMemo } from 'react'
import { TrendingUp, TrendingDown, Info } from 'lucide-react'
import { useAccount } from 'wagmi'
import { useTrading } from '@/hooks/useTrading'
import { useTokenBalance } from '@/hooks/useTokenBalance'
import styles from './TradingPanel.module.css'

type PositionType = 'long' | 'short'
type CollateralType = 'ETH' | 'PEPS'

export default function TradingPanel() {
  const { isConnected } = useAccount()
  const { openPosition, isConfirming } = useTrading()
  const { ethBalance, pepsBalance } = useTokenBalance()

  const [positionType, setPositionType] = useState<PositionType>('long')
  const [leverage, setLeverage] = useState<number>(3)
  const [collateralAmount, setCollateralAmount] = useState<string>('')
  const [collateralType, setCollateralType] = useState<CollateralType>('ETH')

  // Mock prices - En producción vendrán del oracle
  const ethPrice = 2450.00
  const pepsPrice = 0.85
  const oraclePrice = 1247.82

  // Get actual balance based on collateral type
  const actualBalance = collateralType === 'ETH' ? ethBalance : pepsBalance

  // Calculations
  const calculations = useMemo(() => {
    const amount = parseFloat(collateralAmount) || 0
    const collateralValue = collateralType === 'ETH' 
      ? amount * ethPrice 
      : amount * pepsPrice

    const positionSize = collateralValue * leverage
    const entryPrice = oraclePrice
    const liquidationMultiplier = positionType === 'long' 
      ? 1 - (1 / leverage) + 0.01 
      : 1 + (1 / leverage) - 0.01
    const liquidationPrice = entryPrice * liquidationMultiplier
    const healthFactor = leverage > 1 ? (100 / leverage).toFixed(1) : '100.0'
    const estimatedFee = positionSize * 0.001 // 0.1% fee

    return {
      positionSize: positionSize.toFixed(2),
      entryPrice: entryPrice.toFixed(2),
      liquidationPrice: liquidationPrice.toFixed(2),
      healthFactor,
      estimatedFee: estimatedFee.toFixed(2),
    }
  }, [collateralAmount, collateralType, leverage, positionType, ethPrice, pepsPrice, oraclePrice])

  const handleSubmit = async () => {
    if (!isConnected) {
      alert('Please connect your wallet first')
      return
    }

    await openPosition({
      isLong: positionType === 'long',
      collateralAmount,
      leverage,
      collateralToken: collateralType,
    })

    // Clear form on success
    setCollateralAmount('')
  }

  const handleMaxClick = () => {
    setCollateralAmount(actualBalance.toFixed(6))
  }

  const isButtonDisabled = !isConnected || 
                          !collateralAmount || 
                          parseFloat(collateralAmount) <= 0 || 
                          parseFloat(collateralAmount) > actualBalance ||
                          isConfirming

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h2 className={styles.title}>Open Position</h2>
      </div>

      {/* Position Type Toggle */}
      <div className={styles.positionToggle}>
        <button
          className={`${styles.toggleBtn} ${positionType === 'long' ? styles.activeLong : ''}`}
          onClick={() => setPositionType('long')}
        >
          <TrendingUp size={20} />
          Long
        </button>
        <button
          className={`${styles.toggleBtn} ${positionType === 'short' ? styles.activeShort : ''}`}
          onClick={() => setPositionType('short')}
        >
          <TrendingDown size={20} />
          Short
        </button>
      </div>

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
      </div>

      {/* Collateral Input */}
      <div className={styles.section}>
        <label className={styles.label}>Collateral</label>
        <div className={styles.inputGroup}>
          <input
            type="number"
            placeholder="0.00"
            value={collateralAmount}
            onChange={(e) => setCollateralAmount(e.target.value)}
            className={styles.input}
            step="0.01"
            min="0"
            disabled={isConfirming}
          />
          <div className={styles.assetToggle}>
            <button
              className={`${styles.assetBtn} ${collateralType === 'ETH' ? styles.activeAsset : ''}`}
              onClick={() => setCollateralType('ETH')}
            >
              ETH
            </button>
            <button
              className={`${styles.assetBtn} ${collateralType === 'PEPS' ? styles.activeAsset : ''}`}
              onClick={() => setCollateralType('PEPS')}
            >
              PEPS
            </button>
          </div>
        </div>
        <div className={styles.balance}>
          <span>Balance: {actualBalance.toFixed(4)} {collateralType}</span>
          <button className={styles.maxBtn} onClick={handleMaxClick}>
            MAX
          </button>
        </div>
      </div>

      {/* Calculations */}
      <div className={styles.calculations}>
        <div className={styles.calcRow}>
          <span className={styles.calcLabel}>Position Size</span>
          <span className={styles.calcValue}>${calculations.positionSize}</span>
        </div>
        <div className={styles.calcRow}>
          <span className={styles.calcLabel}>Entry Price</span>
          <span className={styles.calcValue}>${calculations.entryPrice}</span>
        </div>
        <div className={styles.calcRow}>
          <span className={styles.calcLabel}>
            Liquidation Price
            <Info size={14} className={styles.infoIcon} />
          </span>
          <span className={`${styles.calcValue} ${styles.warning}`}>
            ${calculations.liquidationPrice}
          </span>
        </div>
        <div className={styles.calcRow}>
          <span className={styles.calcLabel}>Health Factor</span>
          <span className={styles.calcValue}>{calculations.healthFactor}%</span>
        </div>
        <div className={styles.calcRow}>
          <span className={styles.calcLabel}>Estimated Fee</span>
          <span className={styles.calcValue}>${calculations.estimatedFee}</span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        className={`${styles.submitBtn} ${positionType === 'long' ? styles.submitLong : styles.submitShort}`}
        onClick={handleSubmit}
        disabled={isButtonDisabled}
      >
        {isConfirming ? (
          'Processing...'
        ) : positionType === 'long' ? (
          <>
            <TrendingUp size={20} />
            Open Long {leverage}x
          </>
        ) : (
          <>
            <TrendingDown size={20} />
            Open Short {leverage}x
          </>
        )}
      </button>

      {!isConnected && (
        <div className={styles.warning}>
          <Info size={16} />
          <span>Please connect your wallet to start trading</span>
        </div>
      )}

      {/* Risk Warning */}
      {isConnected && (
        <div className={styles.warning}>
          <Info size={16} />
          <span>
            Trading with leverage involves significant risk. You may lose more than your initial collateral.
          </span>
        </div>
      )}
    </div>
  )
}
