'use client'

import { useEffect, useRef } from 'react'
import { createChart, IChartApi, ISeriesApi } from 'lightweight-charts'
import styles from './PnLChart.module.css'

export default function PnLChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)

  useEffect(() => {
    if (!chartContainerRef.current) return

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: '#0a0a0a' },
        textColor: '#a0a0a0',
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.05)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.05)' },
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      timeScale: {
        borderColor: 'rgba(255, 255, 255, 0.1)',
        timeVisible: true,
      },
      rightPriceScale: {
        borderColor: 'rgba(255, 255, 255, 0.1)',
      },
    })

    chartRef.current = chart

    // Add area series for cumulative PnL
    const areaSeries = chart.addAreaSeries({
      lineColor: '#00f0ff',
      topColor: 'rgba(0, 240, 255, 0.3)',
      bottomColor: 'rgba(0, 240, 255, 0.05)',
      lineWidth: 2,
    })

    // Generate mock cumulative PnL data
    const generatePnLData = () => {
      const data = []
      const now = Math.floor(Date.now() / 1000)
      let cumulativePnL = 0
      
      for (let i = 30; i >= 0; i--) {
        const time = (now - i * 86400) as any // daily data
        const change = (Math.random() - 0.45) * 200 // Slight upward bias
        cumulativePnL += change
        
        data.push({
          time,
          value: cumulativePnL,
        })
      }
      
      return data
    }

    areaSeries.setData(generatePnLData())

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        })
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
    }
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Cumulative PnL</h3>
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>30D PnL</span>
            <span className={`${styles.statValue} ${styles.positive}`}>+$1,409.10</span>
          </div>
        </div>
      </div>
      <div ref={chartContainerRef} className={styles.chartContainer} />
    </div>
  )
}
