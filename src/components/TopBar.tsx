'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import styles from './TopBar.module.css'

export default function TopBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Mock prices (estos luego vendrán de oracles)
  const pepsPrice = 0.85
  const oraclePrice = 1247.82

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
            <span className={styles.statValue}>${pepsPrice.toFixed(2)}</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Oracle</span>
            <span className={`${styles.statValue} ${styles.positive}`}>
              ${oraclePrice.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Wallet - Using RainbowKit */}
        <div className={styles.walletSection}>
          <ConnectButton 
            chainStatus="icon"
            showBalance={false}
          />
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
              <span className={styles.statValue}>${pepsPrice.toFixed(2)}</span>
            </div>
            <div className={styles.mobileStatItem}>
              <span className={styles.statLabel}>Oracle Price</span>
              <span className={styles.statValue}>${oraclePrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
