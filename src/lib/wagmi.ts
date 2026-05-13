import { createConfig, http } from 'wagmi'
import { mainnet, sepolia, arbitrum, base } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [
    mainnet,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
    arbitrum,
    base,
  ],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
  },
  ssr: true,
})
