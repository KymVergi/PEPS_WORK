'use client'

import TopBar from '@/components/TopBar'
import Sidebar from '@/components/Sidebar'
import OraclePriceCard from '@/components/OraclePriceCard'
import TradingChart from '@/components/TradingChart'
import { useTrading } from '@/hooks/useTrading'
import styles from './page.module.css'

export default function OraclePage() {
  const { currentPrice, twapPrice, curveLevel, borrowCapacity, leverageUnlocked } = useTrading()

  return (
    <div className={styles.page}>
      <TopBar />
      <Sidebar />

      <main className={styles.main}>
        <div className={styles.container}>
          {/* Hero Price Card */}
          <section className={styles.heroSection}>
            <OraclePriceCard />
          </section>

          {/* Bonding Curve Mechanics */}
          <section className={styles.breakdownSection}>
            <div className={styles.breakdownHeader}>
              <h2 className={styles.breakdownTitle}>Bonding Curve</h2>
              <p className={styles.breakdownSubtitle}>
                Price determined by P(E) = (10 + E)² / 10,000,000
              </p>
            </div>

            <div className={styles.mechanicsGrid}>
              <div className={styles.mechCard}>
                <span className={styles.mechIcon}>📈</span>
                <h3 className={styles.mechTitle}>Current price</h3>
                <p className={styles.mechValue}>
                  {currentPrice > 0 ? currentPrice.toFixed(8) : '—'} ETH
                </p>
                <p className={styles.mechDesc}>Spot price from the bonding curve</p>
              </div>

              <div className={styles.mechCard}>
                <span className={styles.mechIcon}>⏱</span>
                <h3 className={styles.mechTitle}>TWAP (5 min)</h3>
                <p className={styles.mechValue}>
                  {twapPrice > 0 ? twapPrice.toFixed(8) : '—'} ETH
                </p>
                <p className={styles.mechDesc}>Used for liquidations</p>
              </div>

              <div className={styles.mechCard}>
                <span className={styles.mechIcon}>💧</span>
                <h3 className={styles.mechTitle}>Curve level</h3>
                <p className={styles.mechValue}>
                  {curveLevel.toFixed(4)} ETH
                </p>
                <p className={styles.mechDesc}>Total ETH accumulated (max 1500)</p>
              </div>

              <div className={styles.mechCard}>
                <span className={styles.mechIcon}>🏦</span>
                <h3 className={styles.mechTitle}>Borrow cap.</h3>
                <p className={styles.mechValue}>
                  {borrowCapacity > 0 ? borrowCapacity.toFixed(4) : '—'} ETH
                </p>
                <p className={styles.mechDesc}>40% of bands already traversed</p>
              </div>
            </div>
          </section>

          {/* Historical Chart */}
          <section className={styles.chartSection}>
            <div className={styles.chartHeader}>
              <h2 className={styles.chartTitle}>Price History</h2>
              <p className={styles.chartSubtitle}>
                PEPS price evolution on the bonding curve
              </p>
            </div>
            <div className={styles.chartContainer}>
              <TradingChart />
            </div>
          </section>

          {/* Protocol info */}
          <section className={styles.infoSection}>
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>How the curve works</h3>
              <p className={styles.infoText}>
                UniperpHook implements a constant-product bonding curve. Price follows
                P(E) = (V + E)² / K, where V = 10 ETH (virtual ETH), E = ETH in the curve,
                and K = 10,000,000. As more ETH enters, the price rises quadratically.
              </p>
            </div>

            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Band System</h3>
              <p className={styles.infoText}>
                The curve is divided into 300 bands of 5 ETH each (1500 ETH total).
                Each band starts with PERP and accumulates ETH as the level rises.
                Up to 40% of each band's ETH can be lent out for leveraged positions.
              </p>
            </div>

            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Leverage</h3>
              <div className={styles.sourcesList}>
                <span className={styles.sourceItem}>
                  {leverageUnlocked ? '✅' : '🔒'} {leverageUnlocked ? 'Unlocked' : 'Requires 5 ETH in curve'}
                </span>
                <span className={styles.sourceItem}>Leverage: 2x – 5x</span>
                <span className={styles.sourceItem}>Open fee: 1% of borrow</span>
                <span className={styles.sourceItem}>Close fee: 1% of profit</span>
                <span className={styles.sourceItem}>Liquidation: health ≤ 105%</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
