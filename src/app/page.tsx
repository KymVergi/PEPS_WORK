'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, FileText, TrendingUp, Shield, Zap } from 'lucide-react'
import DNABackground from '@/components/DNABackground'
import PeptideMolecule from '@/components/PeptideMolecule'
import StatsCard from '@/components/StatsCard'
import styles from './page.module.css'

export default function HomePage() {
  // Mock data - será reemplazado con datos reales
  const stats = [
    { label: 'Total Value Locked', value: '$142.5M', change: '+12.3%' },
    { label: 'Oracle Price', value: '$1,247.82', change: '+5.8%' },
    { label: '24h Volume', value: '$28.9M', change: '+18.2%' },
    { label: 'Active Positions', value: '3,847', change: '+9.4%' },
  ]

  const features = [
    {
      icon: <TrendingUp size={32} />,
      title: 'Up to 5x Leverage',
      description: 'Trade perpetuals with controlled risk on the revolutionary Peptide Oracle Index'
    },
    {
      icon: <Shield size={32} />,
      title: 'Decentralized Oracle',
      description: 'Real-time pricing from trusted peptide biomarker data aggregated on-chain'
    },
    {
      icon: <Zap size={32} />,
      title: 'Instant Settlement',
      description: 'Lightning-fast execution with minimal slippage and gas optimization'
    }
  ]

  return (
    <div className={styles.page}>
      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.navContent}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoSymbol}>$</span>
            <span className={styles.logoText}>PEPS</span>
          </Link>
          
          <div className={styles.navLinks}>
            <Link href="/trade" className={styles.navLink}>Trade</Link>
            <Link href="/oracle" className={styles.navLink}>Oracle</Link>
            <Link href="/stake" className={styles.navLink}>Stake</Link>
            <a href="#" className={styles.navLink}>Docs</a>
          </div>

          <button className="btn btn-primary">
            Connect Wallet
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <DNABackground />
          <div className={styles.moleculeContainer}>
            <PeptideMolecule />
          </div>
        </div>

        <div className={`${styles.heroContent} container`}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={styles.heroText}
          >
            <h1 className={styles.heroTitle}>
              Leverage the Future of
              <br />
              <span className="text-gradient">the Human Body</span>
            </h1>
            
            <p className={styles.heroSubtitle}>
              Trade perpetuals on the Peptide Oracle Index. The first DeFi protocol 
              tracking human enhancement biomarkers with up to 5x leverage.
            </p>

            <div className={styles.heroButtons}>
              <Link href="/trade" className="btn btn-primary">
                Enter App
                <ArrowRight size={20} />
              </Link>
              <a href="#" className="btn btn-secondary">
                <FileText size={20} />
                Read Whitepaper
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className={styles.scrollIndicator}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className={styles.scrollLine} />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className={styles.stats}>
        <div className="container">
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <StatsCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
                change={stat.change}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={styles.featuresHeader}
          >
            <h2 className={styles.featuresTitle}>
              The Future of <span className="text-gradient">DeFi Trading</span>
            </h2>
            <p className={styles.featuresSubtitle}>
              Advanced perpetuals trading powered by real-world biomarker data
            </p>
          </motion.div>

          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className={styles.featureCard}
              >
                <div className={styles.featureIcon}>
                  {feature.icon}
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={styles.ctaCard}
          >
            <h2 className={styles.ctaTitle}>Ready to Start Trading?</h2>
            <p className={styles.ctaText}>
              Join thousands of traders leveraging the peptide revolution
            </p>
            <Link href="/trade" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1.25rem 3rem' }}>
              Launch App
              <ArrowRight size={24} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={`${styles.footerContent} container`}>
          <div className={styles.footerBrand}>
            <div className={styles.logo}>
              <span className={styles.logoSymbol}>$</span>
              <span className={styles.logoText}>PEPS</span>
            </div>
            <p className={styles.footerTagline}>
              Peptide Perps — Leverage the Future
            </p>
          </div>

          <div className={styles.footerLinks}>
            <div className={styles.footerColumn}>
              <h4 className={styles.footerColumnTitle}>Protocol</h4>
              <a href="#" className={styles.footerLink}>Documentation</a>
              <a href="#" className={styles.footerLink}>Whitepaper</a>
              <a href="#" className={styles.footerLink}>GitHub</a>
            </div>
            <div className={styles.footerColumn}>
              <h4 className={styles.footerColumnTitle}>Community</h4>
              <a href="#" className={styles.footerLink}>Twitter</a>
              <a href="#" className={styles.footerLink}>Discord</a>
              <a href="#" className={styles.footerLink}>Telegram</a>
            </div>
            <div className={styles.footerColumn}>
              <h4 className={styles.footerColumnTitle}>Legal</h4>
              <a href="#" className={styles.footerLink}>Terms</a>
              <a href="#" className={styles.footerLink}>Privacy</a>
              <a href="#" className={styles.footerLink}>Risk Disclosure</a>
            </div>
          </div>
        </div>

        <div className={`${styles.footerBottom} container`}>
          <p className={styles.footerCopyright}>
            © 2024 Peptide Perps. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
