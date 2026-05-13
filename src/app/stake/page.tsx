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
                Earn rewards by staking your PEPS tokens. Higher lock periods earn higher APY.
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
            <h2 className={styles.benefitsTitle}>Why Stake $PEPS?</h2>
            <div className={styles.benefitsGrid}>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>💰</div>
                <h3 className={styles.benefitTitle}>Earn Passive Income</h3>
                <p className={styles.benefitText}>
                  Generate consistent rewards with APY up to 35% on 365-day locks.
                </p>
              </div>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>🛡️</div>
                <h3 className={styles.benefitTitle}>Protocol Governance</h3>
                <p className={styles.benefitText}>
                  Staked tokens grant voting rights on protocol decisions and parameters.
                </p>
              </div>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>📈</div>
                <h3 className={styles.benefitTitle}>Reduced Fees</h3>
                <p className={styles.benefitText}>
                  Stakers enjoy reduced trading fees and priority access to new features.
                </p>
              </div>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>🔒</div>
                <h3 className={styles.benefitTitle}>Flexible Options</h3>
                <p className={styles.benefitText}>
                  Choose from multiple lock periods to match your investment strategy.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className={styles.faqSection}>
            <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
            <div className={styles.faqGrid}>
              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>How are rewards calculated?</h3>
                <p className={styles.faqAnswer}>
                  Rewards are calculated based on your staked amount, lock period APY, and time staked. 
                  Rewards compound automatically and can be claimed at any time.
                </p>
              </div>
              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>Can I unstake early?</h3>
                <p className={styles.faqAnswer}>
                  Early unstaking is possible but incurs a 10% penalty. It's recommended to choose 
                  a lock period that matches your investment timeline.
                </p>
              </div>
              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>What happens after the lock period?</h3>
                <p className={styles.faqAnswer}>
                  After the lock period ends, your tokens automatically become unstakeable without 
                  penalty. You can claim rewards and unstake or choose to restake.
                </p>
              </div>
              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>Are there any risks?</h3>
                <p className={styles.faqAnswer}>
                  Smart contracts have been audited, but all DeFi carries inherent risks. 
                  Never stake more than you can afford to lose.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
