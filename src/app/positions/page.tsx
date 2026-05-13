'use client'

import TopBar from '@/components/TopBar'
import Sidebar from '@/components/Sidebar'
import PositionHistory from '@/components/PositionHistory'
import PnLChart from '@/components/PnLChart'
import styles from './page.module.css'

export default function PositionsPage() {
  return (
    <div className={styles.page}>
      <TopBar />
      <Sidebar />
      
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Header */}
          <section className={styles.header}>
            <div>
              <h1 className={styles.title}>Position History</h1>
              <p className={styles.subtitle}>
                Track all your trading positions, performance metrics, and cumulative PnL
              </p>
            </div>
          </section>

          {/* PnL Chart */}
          <section className={styles.chartSection}>
            <PnLChart />
          </section>

          {/* Position History Table */}
          <section className={styles.historySection}>
            <PositionHistory />
          </section>
        </div>
      </main>
    </div>
  )
}
