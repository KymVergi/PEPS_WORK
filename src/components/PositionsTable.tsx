'use client'

import { TrendingUp, X, Activity, AlertTriangle } from 'lucide-react'
import { useAccount } from 'wagmi'
import { useTrading } from '@/hooks/useTrading'
import styles from './PositionsTable.module.css'

export default function PositionsTable() {
  const { isConnected } = useAccount()
  const { position, currentPrice, closePosition, isConfirming } = useTrading()

  if (!isConnected) {
    return (
      <div className={styles.empty}>
        <TrendingUp size={48} className={styles.emptyIcon} />
        <h3 className={styles.emptyTitle}>Wallet not connected</h3>
        <p className={styles.emptyText}>Connect your wallet to view your positions</p>
      </div>
    )
  }

  if (!position?.isOpen) {
    return (
      <div className={styles.empty}>
        <TrendingUp size={48} className={styles.emptyIcon} />
        <h3 className={styles.emptyTitle}>No open positions</h3>
        <p className={styles.emptyText}>
          Open your first long position on the PEPS bonding curve
        </p>
      </div>
    )
  }

  const { collateralETH, holdingPERP, debtETH, leverage, entryPriceETH, liqPriceETH, health, pnlETH, pnlPercent } = position
  const isProfitable = pnlETH >= 0

  const healthColor = () => {
    if (health > 150) return styles.healthSafe
    if (health > 120) return styles.healthModerate
    if (health > 110) return styles.healthHigh
    return styles.healthCritical
  }

  const healthLabel = () => {
    if (health > 150) return 'SAFE'
    if (health > 120) return 'MODERATE'
    if (health > 110) return 'HIGH RISK'
    return 'CRITICAL'
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          <Activity size={18} />
          Open Position
        </h3>
        <span className={styles.badge}>LONG</span>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Collateral</th>
              <th>PERP holding</th>
              <th>Debt</th>
              <th>Leverage</th>
              <th>Entry price</th>
              <th>Current price</th>
              <th>Liq. price</th>
              <th>Health</th>
              <th>PnL</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.mono}>{collateralETH.toFixed(4)} ETH</td>
              <td className={styles.mono}>{holdingPERP.toFixed(2)} PERP</td>
              <td className={`${styles.mono} ${styles.debtCell}`}>
                {debtETH.toFixed(4)} ETH
              </td>
              <td>
                <span className={styles.leverage}>{leverage}x</span>
              </td>
              <td className={styles.mono}>{entryPriceETH.toFixed(6)} ETH</td>
              <td className={styles.mono}>{currentPrice.toFixed(6)} ETH</td>
              <td className={`${styles.mono} ${styles.liqCell}`}>
                {liqPriceETH.toFixed(6)} ETH
              </td>
              <td>
                <div className={`${styles.healthBadge} ${healthColor()}`}>
                  {health <= 110 && <AlertTriangle size={12} />}
                  {health}% {healthLabel()}
                </div>
              </td>
              <td>
                <div className={styles.pnl}>
                  <span className={`${styles.pnlValue} ${isProfitable ? styles.profit : styles.loss}`}>
                    {isProfitable ? '+' : ''}{pnlETH.toFixed(5)} ETH
                  </span>
                  <span className={`${styles.pnlPercent} ${isProfitable ? styles.profit : styles.loss}`}>
                    ({isProfitable ? '+' : ''}{pnlPercent.toFixed(2)}%)
                  </span>
                </div>
              </td>
              <td>
                <button
                  className={styles.closeBtn}
                  onClick={() => closePosition(0n)}
                  disabled={isConfirming}
                  title="Close full position"
                >
                  <X size={16} />
                  {isConfirming ? 'Closing...' : 'Close'}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {health <= 110 && (
        <div className={styles.liquidationWarning}>
          <AlertTriangle size={16} />
          <span>
            Warning! Your position is close to liquidation (health ≤ 110%).
            Liquidation occurs at health ≤ 105%.
          </span>
        </div>
      )}
    </div>
  )
}
