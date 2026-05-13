'use client'

import TopBar from '@/components/TopBar'
import Sidebar from '@/components/Sidebar'
import TradingChart from '@/components/TradingChart'
import TradingPanel from '@/components/TradingPanel'
import PositionsTable from '@/components/PositionsTable'
import styles from './page.module.css'

export default function TradePage() {
  return (
    <div className={styles.page}>
      <TopBar />
      <Sidebar />
      
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Chart and Trading Panel Grid */}
          <div className={styles.tradingGrid}>
            <div className={styles.chartSection}>
              <TradingChart />
            </div>
            <div className={styles.panelSection}>
              <TradingPanel />
            </div>
          </div>

          {/* Positions Table */}
          <div className={styles.positionsSection}>
            <PositionsTable />
          </div>
        </div>
      </main>
    </div>
  )
}
