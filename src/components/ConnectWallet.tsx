'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Wallet, LogOut, AlertCircle } from 'lucide-react'
import styles from './ConnectWallet.module.css'

export default function ConnectWallet() {
  const { address, isConnected, chain } = useAccount()
  const { connect, connectors, isPending, error } = useConnect()
  const { disconnect } = useDisconnect()

  const shortAddress = address
    ? `${address.slice(0, 6)}…${address.slice(-4)}`
    : ''

  if (isConnected) {
    return (
      <div className={styles.connected}>
        <div className={styles.info}>
          <span className={styles.dot} />
          <span className={styles.address}>{shortAddress}</span>
          {chain && <span className={styles.network}>{chain.name}</span>}
        </div>
        <button className={styles.disconnectBtn} onClick={() => disconnect()} title="Disconnect">
          <LogOut size={15} />
        </button>
      </div>
    )
  }

  const metamask = connectors[0] // injected = MetaMask

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.connectBtn}
        onClick={() => connect({ connector: metamask })}
        disabled={isPending}
      >
        <Wallet size={16} />
        {isPending ? 'Connecting…' : 'Connect MetaMask'}
      </button>
      {error && (
        <div className={styles.error}>
          <AlertCircle size={13} />
          {error.message.includes('rejected') ? 'Request rejected' : error.message}
        </div>
      )}
    </div>
  )
}
