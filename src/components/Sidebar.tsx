'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { TrendingUp, Activity, Lock, Database } from 'lucide-react'
import styles from './Sidebar.module.css'

const navItems = [
  { href: '/trade', icon: TrendingUp, label: 'Trade' },
  { href: '/positions', icon: Activity, label: 'Positions' },
  { href: '/stake', icon: Lock, label: 'Staking' },
  { href: '/oracle', icon: Database, label: 'Oracle' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
