'use client'

import { useEffect, useRef } from 'react'
import { createChart, IChartApi, ISeriesApi, CandlestickData } from 'lightweight-charts'
import styles from './TradingChart.module.css'

export default function TradingChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null)

  useEffect(() => {
    if (!chartContainerRef.current) return

    // Create chart
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
      crosshair: {
        vertLine: {
          color: 'rgba(0, 240, 255, 0.5)',
          labelBackgroundColor: '#00f0ff',
        },
        horzLine: {
          color: 'rgba(0, 240, 255, 0.5)',
          labelBackgroundColor: '#00f0ff',
        },
      },
    })

    chartRef.current = chart

    // Add candlestick series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#00ff88',
      downColor: '#ff4444',
      borderUpColor: '#00ff88',
      borderDownColor: '#ff4444',
      wickUpColor: '#00ff88',
      wickDownColor: '#ff4444',
    })

    seriesRef.current = candlestickSeries

    // Generate mock data for Peptide Oracle Index
    const generateMockData = (): CandlestickData[] => {
      const data: CandlestickData[] = []
      const basePrice = 1247.82
      let currentPrice = basePrice
      const now = Math.floor(Date.now() / 1000)
      
      for (let i = 100; i >= 0; i--) {
        const time = (now - i * 3600) as any // hourly candles
        const volatility = 15 + Math.random() * 10
        const change = (Math.random() - 0.5) * volatility
        
        currentPrice += change
        const open = currentPrice
        const close = currentPrice + (Math.random() - 0.5) * volatility
        const high = Math.max(open, close) + Math.random() * (volatility / 2)
        const low = Math.min(open, close) - Math.random() * (volatility / 2)
        
        data.push({
          time,
          open,
          high,
          low,
          close,
        })
        
        currentPrice = close
      }
      
      return data
    }

    candlestickSeries.setData(generateMockData())

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
        <div className={styles.headerLeft}>
          <h3 className={styles.title}>Peptide Oracle Index</h3>
          <div className={styles.priceInfo}>
            <span className={styles.price}>$1,247.82</span>
            <span className={styles.change}>+5.8%</span>
          </div>
        </div>
        <div className={styles.timeframes}>
          {['1H', '4H', '1D', '1W', '1M'].map((tf) => (
            <button 
              key={tf} 
              className={`${styles.timeframeBtn} ${tf === '1H' ? styles.active : ''}`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>
      <div ref={chartContainerRef} className={styles.chartContainer} />
    </div>
  )
}
