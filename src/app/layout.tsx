import type { Metadata } from 'next'
import { Providers } from '@/components/Providers'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: '$PEPS - Peptide Perps | Leverage the Future of the Human Body',
  description: 'Advanced DeFi perpetuals trading on the Peptide Oracle Index. Trade with leverage on the future of human enhancement.',
  keywords: 'DeFi, perpetuals, trading, peptides, leverage, crypto',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
