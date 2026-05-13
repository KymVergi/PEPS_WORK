'use client'

import TopBar from '@/components/TopBar'
import Sidebar from '@/components/Sidebar'
import OraclePriceCard from '@/components/OraclePriceCard'
import IndexBreakdown from '@/components/IndexBreakdown'
import TradingChart from '@/components/TradingChart'
import styles from './page.module.css'

export default function OraclePage() {
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

          {/* Index Breakdown */}
          <section className={styles.breakdownSection}>
            <IndexBreakdown />
          </section>

          {/* Historical Chart */}
          <section className={styles.chartSection}>
            <div className={styles.chartHeader}>
              <h2 className={styles.chartTitle}>Historical Price</h2>
              <p className={styles.chartSubtitle}>
                Peptide Oracle Index performance over time
              </p>
            </div>
            <div className={styles.chartContainer}>
              <TradingChart />
            </div>
          </section>

          {/* Data Sources Info */}
          <section className={styles.infoSection}>
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>About the Oracle</h3>
              <p className={styles.infoText}>
                The Peptide Oracle Index aggregates real-time biomarker pricing data from verified 
                suppliers and research institutions. The index is rebalanced quarterly based on market 
                demand, research volume, and therapeutic potential.
              </p>
            </div>

            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Update Frequency</h3>
              <p className={styles.infoText}>
                Price feeds are updated every 60 seconds from multiple data sources. The oracle uses 
                a median price calculation to prevent manipulation and ensure accuracy.
              </p>
            </div>

            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Data Sources</h3>
              <div className={styles.sourcesList}>
                <span className={styles.sourceItem}>Global Peptide Suppliers</span>
                <span className={styles.sourceItem}>Research Institutions</span>
                <span className={styles.sourceItem}>Pharmaceutical Markets</span>
                <span className={styles.sourceItem}>Clinical Trial Data</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
