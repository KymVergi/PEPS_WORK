'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from '@/lib/wagmi'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1a1a1a',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            },
            success: {
              iconTheme: { primary: '#00ff88', secondary: '#1a1a1a' },
            },
            error: {
              iconTheme: { primary: '#ff4444', secondary: '#1a1a1a' },
            },
          }}
        />
      </QueryClientProvider>
    </WagmiProvider>
  )
}
