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
                Precio determinado por P(E) = (10 + E)² / 10,000,000
              </p>
            </div>

            <div className={styles.mechanicsGrid}>
              <div className={styles.mechCard}>
                <span className={styles.mechIcon}>📈</span>
                <h3 className={styles.mechTitle}>Precio actual</h3>
                <p className={styles.mechValue}>
                  {currentPrice > 0 ? currentPrice.toFixed(8) : '—'} ETH
                </p>
                <p className={styles.mechDesc}>Precio spot de la bonding curve</p>
              </div>

              <div className={styles.mechCard}>
                <span className={styles.mechIcon}>⏱</span>
                <h3 className={styles.mechTitle}>TWAP (5 min)</h3>
                <p className={styles.mechValue}>
                  {twapPrice > 0 ? twapPrice.toFixed(8) : '—'} ETH
                </p>
                <p className={styles.mechDesc}>Usado para liquidaciones</p>
              </div>

              <div className={styles.mechCard}>
                <span className={styles.mechIcon}>💧</span>
                <h3 className={styles.mechTitle}>Nivel de curva</h3>
                <p className={styles.mechValue}>
                  {curveLevel.toFixed(4)} ETH
                </p>
                <p className={styles.mechDesc}>ETH total acumulado (máx 1500)</p>
              </div>

              <div className={styles.mechCard}>
                <span className={styles.mechIcon}>🏦</span>
                <h3 className={styles.mechTitle}>Cap. préstamo</h3>
                <p className={styles.mechValue}>
                  {borrowCapacity > 0 ? borrowCapacity.toFixed(4) : '—'} ETH
                </p>
                <p className={styles.mechDesc}>40% de bandas ya recorridas</p>
              </div>
            </div>
          </section>

          {/* Historical Chart */}
          <section className={styles.chartSection}>
            <div className={styles.chartHeader}>
              <h2 className={styles.chartTitle}>Historial de Precio</h2>
              <p className={styles.chartSubtitle}>
                Evolución del precio PEPS en la bonding curve
              </p>
            </div>
            <div className={styles.chartContainer}>
              <TradingChart />
            </div>
          </section>

          {/* Protocol info */}
          <section className={styles.infoSection}>
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Cómo funciona la curva</h3>
              <p className={styles.infoText}>
                UniperpHook implementa una bonding curve de producto constante. El precio sigue
                P(E) = (V + E)² / K, donde V = 10 ETH (ETH virtual), E = ETH en la curva, y
                K = 10,000,000. A medida que más ETH entra, el precio sube cuadráticamente.
              </p>
            </div>

            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Sistema de Bandas</h3>
              <p className={styles.infoText}>
                La curva está dividida en 300 bandas de 5 ETH cada una (total 1500 ETH).
                Cada banda comienza con PERP y va acumulando ETH conforme el nivel sube.
                Hasta el 40% del ETH de cada banda puede ser prestado para posiciones leveraged.
              </p>
            </div>

            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Leverage</h3>
              <div className={styles.sourcesList}>
                <span className={styles.sourceItem}>
                  {leverageUnlocked ? '✅' : '🔒'} {leverageUnlocked ? 'Desbloqueado' : 'Requiere 5 ETH en curva'}
                </span>
                <span className={styles.sourceItem}>Apalancamiento: 2x – 5x</span>
                <span className={styles.sourceItem}>Fee apertura: 1% sobre borrow</span>
                <span className={styles.sourceItem}>Fee cierre: 1% sobre profit</span>
                <span className={styles.sourceItem}>Liquidación: health ≤ 105%</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
