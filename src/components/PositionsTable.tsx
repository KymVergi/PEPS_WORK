'use client'

import { TrendingUp, TrendingDown, X } from 'lucide-react'
import styles from './PositionsTable.module.css'

interface Position {
  id: string
  type: 'long' | 'short'
  size: number
  leverage: number
  entryPrice: number
  currentPrice: number
  liquidationPrice: number
  pnl: number
  pnlPercent: number
}

export default function PositionsTable() {
  // Mock positions data
  const positions: Position[] = [
    {
      id: '1',
      type: 'long',
      size: 10000,
      leverage: 3,
      entryPrice: 1235.50,
      currentPrice: 1247.82,
      liquidationPrice: 1029.58,
      pnl: 123.20,
      pnlPercent: 3.69,
    },
    {
      id: '2',
      type: 'short',
      size: 5000,
      leverage: 2,
      entryPrice: 1260.00,
      currentPrice: 1247.82,
      liquidationPrice: 1575.00,
      pnl: 60.90,
      pnlPercent: 2.43,
    },
  ]

  const handleClosePosition = (id: string) => {
    console.log('Closing position:', id)
    // Aquí se conectará con el smart contract
  }

  if (positions.length === 0) {
    return (
      <div className={styles.empty}>
        <TrendingUp size={48} className={styles.emptyIcon} />
        <h3 className={styles.emptyTitle}>No Open Positions</h3>
        <p className={styles.emptyText}>
          Open your first position to start trading on the Peptide Oracle Index
        </p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Open Positions</h3>
        <span className={styles.count}>{positions.length}</span>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Type</th>
              <th>Size</th>
              <th>Leverage</th>
              <th>Entry Price</th>
              <th>Current Price</th>
              <th>Liquidation</th>
              <th>PnL</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((position) => (
              <tr key={position.id}>
                <td>
                  <div className={`${styles.type} ${styles[position.type]}`}>
                    {position.type === 'long' ? (
                      <TrendingUp size={16} />
                    ) : (
                      <TrendingDown size={16} />
                    )}
                    <span>{position.type.toUpperCase()}</span>
                  </div>
                </td>
                <td className={styles.mono}>${position.size.toFixed(2)}</td>
                <td>
                  <span className={styles.leverage}>{position.leverage}x</span>
                </td>
                <td className={styles.mono}>${position.entryPrice.toFixed(2)}</td>
                <td className={styles.mono}>${position.currentPrice.toFixed(2)}</td>
                <td className={`${styles.mono} ${styles.liquidation}`}>
                  ${position.liquidationPrice.toFixed(2)}
                </td>
                <td>
                  <div className={styles.pnl}>
                    <span className={`${styles.pnlValue} ${position.pnl >= 0 ? styles.profit : styles.loss}`}>
                      {position.pnl >= 0 ? '+' : ''}${position.pnl.toFixed(2)}
                    </span>
                    <span className={`${styles.pnlPercent} ${position.pnl >= 0 ? styles.profit : styles.loss}`}>
                      ({position.pnl >= 0 ? '+' : ''}{position.pnlPercent.toFixed(2)}%)
                    </span>
                  </div>
                </td>
                <td>
                  <button
                    className={styles.closeBtn}
                    onClick={() => handleClosePosition(position.id)}
                    title="Close Position"
                  >
                    <X size={16} />
                    Close
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
