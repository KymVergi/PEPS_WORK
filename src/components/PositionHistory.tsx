'use client'

import { useState } from 'react'
import { Search, Filter, Download, TrendingUp, TrendingDown, X } from 'lucide-react'
import styles from './PositionHistory.module.css'

type FilterType = 'all' | 'open' | 'closed'
type PositionType = 'long' | 'short'

interface HistoricalPosition {
  id: string
  type: PositionType
  size: number
  leverage: number
  entryPrice: number
  exitPrice?: number
  liquidationPrice: number
  pnl: number
  pnlPercent: number
  status: 'open' | 'closed' | 'liquidated'
  openedAt: string
  closedAt?: string
  duration?: string
}

export default function PositionHistory() {
  const [filter, setFilter] = useState<FilterType>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Mock positions history
  const positions: HistoricalPosition[] = [
    {
      id: '1',
      type: 'long',
      size: 10000,
      leverage: 3,
      entryPrice: 1235.50,
      exitPrice: 1247.82,
      liquidationPrice: 1029.58,
      pnl: 123.20,
      pnlPercent: 3.69,
      status: 'open',
      openedAt: '2024-01-15 14:30',
      duration: '2d 5h',
    },
    {
      id: '2',
      type: 'short',
      size: 5000,
      leverage: 2,
      entryPrice: 1260.00,
      exitPrice: 1247.82,
      liquidationPrice: 1575.00,
      pnl: 60.90,
      pnlPercent: 2.43,
      status: 'open',
      openedAt: '2024-01-14 09:15',
      duration: '3d 10h',
    },
    {
      id: '3',
      type: 'long',
      size: 15000,
      leverage: 4,
      entryPrice: 1180.00,
      exitPrice: 1235.00,
      liquidationPrice: 983.33,
      pnl: 825.00,
      pnlPercent: 22.00,
      status: 'closed',
      openedAt: '2024-01-10 11:20',
      closedAt: '2024-01-12 16:45',
      duration: '2d 5h',
    },
    {
      id: '4',
      type: 'short',
      size: 8000,
      leverage: 3,
      entryPrice: 1300.00,
      exitPrice: 1250.00,
      liquidationPrice: 1625.00,
      pnl: 400.00,
      pnlPercent: 15.00,
      status: 'closed',
      openedAt: '2024-01-08 13:00',
      closedAt: '2024-01-09 10:30',
      duration: '21h 30m',
    },
    {
      id: '5',
      type: 'long',
      size: 20000,
      leverage: 5,
      entryPrice: 1200.00,
      exitPrice: 1150.00,
      liquidationPrice: 1000.00,
      pnl: -1000.00,
      pnlPercent: -25.00,
      status: 'liquidated',
      openedAt: '2024-01-05 08:15',
      closedAt: '2024-01-06 14:20',
      duration: '1d 6h',
    },
  ]

  const filteredPositions = positions.filter(pos => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'open' && pos.status === 'open') ||
                         (filter === 'closed' && (pos.status === 'closed' || pos.status === 'liquidated'))
    
    const matchesSearch = searchQuery === '' || 
                         pos.id.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesFilter && matchesSearch
  })

  const stats = {
    total: positions.length,
    open: positions.filter(p => p.status === 'open').length,
    closed: positions.filter(p => p.status === 'closed' || p.status === 'liquidated').length,
    totalPnl: positions.reduce((sum, p) => sum + p.pnl, 0),
    winRate: (positions.filter(p => p.pnl > 0).length / positions.length * 100).toFixed(1),
  }

  const handleExport = () => {
    console.log('Exporting positions...')
    // Aquí iría la lógica de exportación
  }

  const handleClosePosition = (id: string) => {
    console.log('Closing position:', id)
    // Aquí se conectará con el smart contract
  }

  return (
    <div className={styles.container}>
      {/* Stats Overview */}
      <div className={styles.statsBar}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Total Positions</span>
          <span className={styles.statValue}>{stats.total}</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Open</span>
          <span className={styles.statValue}>{stats.open}</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Closed</span>
          <span className={styles.statValue}>{stats.closed}</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Total PnL</span>
          <span className={`${styles.statValue} ${stats.totalPnl >= 0 ? styles.positive : styles.negative}`}>
            {stats.totalPnl >= 0 ? '+' : ''}${stats.totalPnl.toFixed(2)}
          </span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Win Rate</span>
          <span className={styles.statValue}>{stats.winRate}%</span>
        </div>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.filters}>
          <button
            className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`${styles.filterBtn} ${filter === 'open' ? styles.active : ''}`}
            onClick={() => setFilter('open')}
          >
            Open
          </button>
          <button
            className={`${styles.filterBtn} ${filter === 'closed' ? styles.active : ''}`}
            onClick={() => setFilter('closed')}
          >
            Closed
          </button>
        </div>

        <div className={styles.searchBar}>
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <button className={styles.exportBtn} onClick={handleExport}>
          <Download size={18} />
          Export
        </button>
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Size</th>
              <th>Leverage</th>
              <th>Entry Price</th>
              <th>Exit Price</th>
              <th>PnL</th>
              <th>Status</th>
              <th>Opened</th>
              <th>Duration</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPositions.map((position) => (
              <tr key={position.id}>
                <td className={styles.mono}>#{position.id}</td>
                <td>
                  <div className={`${styles.type} ${styles[position.type]}`}>
                    {position.type === 'long' ? (
                      <TrendingUp size={16} />
                    ) : (
                      <TrendingDown size={16} />
                    )}
                    <span>{position.type.toUpperCase()}</span>
                  </div>
                </td>
                <td className={styles.mono}>${position.size.toFixed(2)}</td>
                <td>
                  <span className={styles.leverage}>{position.leverage}x</span>
                </td>
                <td className={styles.mono}>${position.entryPrice.toFixed(2)}</td>
                <td className={styles.mono}>
                  {position.exitPrice ? `$${position.exitPrice.toFixed(2)}` : '-'}
                </td>
                <td>
                  <div className={styles.pnl}>
                    <span className={`${styles.pnlValue} ${position.pnl >= 0 ? styles.profit : styles.loss}`}>
                      {position.pnl >= 0 ? '+' : ''}${position.pnl.toFixed(2)}
                    </span>
                    <span className={`${styles.pnlPercent} ${position.pnl >= 0 ? styles.profit : styles.loss}`}>
                      ({position.pnl >= 0 ? '+' : ''}{position.pnlPercent.toFixed(2)}%)
                    </span>
                  </div>
                </td>
                <td>
                  <span className={`${styles.status} ${styles[position.status]}`}>
                    {position.status}
                  </span>
                </td>
                <td className={styles.mono}>{position.openedAt}</td>
                <td className={styles.mono}>{position.duration}</td>
                <td>
                  {position.status === 'open' ? (
                    <button
                      className={styles.closeBtn}
                      onClick={() => handleClosePosition(position.id)}
                      title="Close Position"
                    >
                      <X size={16} />
                      Close
                    </button>
                  ) : (
                    <span className={styles.closedLabel}>-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredPositions.length === 0 && (
        <div className={styles.empty}>
          <Filter size={48} className={styles.emptyIcon} />
          <h3 className={styles.emptyTitle}>No positions found</h3>
          <p className={styles.emptyText}>Try adjusting your filters or search query</p>
        </div>
      )}
    </div>
  )
}
