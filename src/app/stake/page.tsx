'use client'

import TopBar from '@/components/TopBar'
import Sidebar from '@/components/Sidebar'
import StakingPanel from '@/components/StakingPanel'
import StakingStats from '@/components/StakingStats'
import styles from './page.module.css'

export default function StakePage() {
  return (
    <div className={styles.page}>
      <TopBar />
      <Sidebar />
      
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Header */}
          <section className={styles.header}>
            <div>
              <h1 className={styles.title}>Stake $PEPS</h1>
              <p className={styles.subtitle}>
                Stakea PEPS y recibe una parte de las comisiones del protocolo en ETH.
                Sin período de lock. Sin penalizaciones.
              </p>
            </div>
          </section>

          {/* Main Grid */}
          <div className={styles.mainGrid}>
            {/* Left: Staking Panel */}
            <div className={styles.panelSection}>
              <StakingPanel />
            </div>

            {/* Right: Stats */}
            <div className={styles.statsSection}>
              <StakingStats />
            </div>
          </div>

          {/* Benefits Section */}
          <section className={styles.benefitsSection}>
            <h2 className={styles.benefitsTitle}>¿Por qué stakear $PEPS?</h2>
            <div className={styles.benefitsGrid}>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>💰</div>
                <h3 className={styles.benefitTitle}>Comisiones en ETH</h3>
                <p className={styles.benefitText}>
                  Recibe una parte de las fees de apertura (1%) y cierre (1%) de posiciones,
                  pagadas directamente en ETH.
                </p>
              </div>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>🔓</div>
                <h3 className={styles.benefitTitle}>Sin Lock</h3>
                <p className={styles.benefitText}>
                  No hay período mínimo de lock. Puedes stakear y unstakear en cualquier momento
                  sin penalizaciones.
                </p>
              </div>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>📊</div>
                <h3 className={styles.benefitTitle}>Proporcional al volumen</h3>
                <p className={styles.benefitText}>
                  A mayor volumen de trading en el protocolo, mayores recompensas para los stakers.
                  Incentivos alineados con el crecimiento del protocolo.
                </p>
              </div>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>⚡</div>
                <h3 className={styles.benefitTitle}>Reclamar en cualquier momento</h3>
                <p className={styles.benefitText}>
                  Las recompensas se acumulan en tiempo real. Reclámalas cuando quieras
                  directamente en tu wallet como ETH.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className={styles.faqSection}>
            <h2 className={styles.faqTitle}>Preguntas frecuentes</h2>
            <div className={styles.faqGrid}>
              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>¿Cómo se calculan las recompensas?</h3>
                <p className={styles.faqAnswer}>
                  Las recompensas se distribuyen en ETH proporcional a tu stake. Por cada apertura
                  de posición se distribuye el 1% del borrow, y por cada cierre el 1% del profit,
                  entre todos los stakers.
                </p>
              </div>
              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>¿Puedo unstakear en cualquier momento?</h3>
                <p className={styles.faqAnswer}>
                  Sí, no hay período de lock. Puedes unstakear tus PEPS en cualquier momento
                  sin penalizaciones. Las recompensas pendientes se acumulan hasta que las reclames.
                </p>
              </div>
              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>¿Qué pasa con las liquidaciones?</h3>
                <p className={styles.faqAnswer}>
                  Cuando se cierra una posición con profit, el 1% de ese profit va a stakers.
                  En liquidaciones con surplus, también se distribuye el fee de cierre entre stakers.
                </p>
              </div>
              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>¿Cuáles son los riesgos?</h3>
                <p className={styles.faqAnswer}>
                  El contrato es un Uniswap V4 Hook. Los smart contracts no han sido auditados
                  en mainnet. No arriesgues más de lo que puedes perder. El protocolo puede acumular
                  bad debt si hay liquidaciones fallidas.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
