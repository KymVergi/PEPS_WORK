'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import ConnectWallet from './ConnectWallet'
import { useTrading } from '@/hooks/useTrading'
import styles from './TopBar.module.css'

export default function TopBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { currentPrice, curveLevel } = useTrading()

  return (
    <div className={styles.topbar}>
      <div className={styles.content}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoSymbol}>$</span>
          <span className={styles.logoText}>PEPS</span>
        </Link>

        {/* Stats */}
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>PEPS</span>
            <span className={styles.statValue}>
              {currentPrice > 0 ? `${currentPrice.toFixed(6)} ETH` : '—'}
            </span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Curva</span>
            <span className={`${styles.statValue} ${styles.positive}`}>
              {curveLevel > 0 ? `${curveLevel.toFixed(3)} ETH` : '—'}
            </span>
          </div>
        </div>

        {/* Wallet */}
        <div className={styles.walletSection}>
          <ConnectWallet />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={styles.menuToggle}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileStats}>
            <div className={styles.mobileStatItem}>
              <span className={styles.statLabel}>PEPS Price</span>
              <span className={styles.statValue}>
                {currentPrice > 0 ? `${currentPrice.toFixed(6)} ETH` : '—'}
              </span>
            </div>
            <div className={styles.mobileStatItem}>
              <span className={styles.statLabel}>Nivel Curva</span>
              <span className={styles.statValue}>
                {curveLevel > 0 ? `${curveLevel.toFixed(3)} ETH` : '—'}
              </span>
            </div>
          </div>
          <div className={styles.mobileWallet}>
            <ConnectWallet />
          </div>
        </div>
      )}
    </div>
  )
}
