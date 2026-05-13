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
                Stake PEPS and earn a share of protocol fees in ETH.
                No lock period. No penalties.
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
            <h2 className={styles.benefitsTitle}>Why stake $PEPS?</h2>
            <div className={styles.benefitsGrid}>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>💰</div>
                <h3 className={styles.benefitTitle}>Fees in ETH</h3>
                <p className={styles.benefitText}>
                  Earn a share of the open (1%) and close (1%) position fees,
                  paid directly in ETH.
                </p>
              </div>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>🔓</div>
                <h3 className={styles.benefitTitle}>No Lock</h3>
                <p className={styles.benefitText}>
                  No minimum lock period. You can stake and unstake at any time
                  without penalties.
                </p>
              </div>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>📊</div>
                <h3 className={styles.benefitTitle}>Volume-proportional</h3>
                <p className={styles.benefitText}>
                  Higher trading volume means higher rewards for stakers.
                  Incentives aligned with protocol growth.
                </p>
              </div>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>⚡</div>
                <h3 className={styles.benefitTitle}>Claim any time</h3>
                <p className={styles.benefitText}>
                  Rewards accumulate in real time. Claim them whenever you want,
                  directly to your wallet as ETH.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className={styles.faqSection}>
            <h2 className={styles.faqTitle}>FAQ</h2>
            <div className={styles.faqGrid}>
              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>How are rewards calculated?</h3>
                <p className={styles.faqAnswer}>
                  Rewards are distributed in ETH proportional to your stake. Each position open
                  distributes 1% of the borrow, and each close distributes 1% of the profit,
                  among all stakers.
                </p>
              </div>
              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>Can I unstake at any time?</h3>
                <p className={styles.faqAnswer}>
                  Yes, there is no lock period. You can unstake your PEPS at any time
                  without penalties. Pending rewards accumulate until you claim them.
                </p>
              </div>
              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>What happens with liquidations?</h3>
                <p className={styles.faqAnswer}>
                  When a position is closed with profit, 1% of that profit goes to stakers.
                  In liquidations with surplus, the close fee is also distributed among stakers.
                </p>
              </div>
              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>What are the risks?</h3>
                <p className={styles.faqAnswer}>
                  The contract is a Uniswap V4 Hook. Smart contracts have not been audited
                  on mainnet. Do not risk more than you can afford to lose. The protocol may
                  accumulate bad debt if liquidations fail.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
