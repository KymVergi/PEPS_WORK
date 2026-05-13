// Contract addresses from environment variables
export const CONTRACT_ADDRESSES = {
  // Mainnet addresses
  1: {
    PEPS_TOKEN: process.env.NEXT_PUBLIC_MAINNET_PEPS_TOKEN as `0x${string}` || '0x0000000000000000000000000000000000000000',
    UNIPERP_HOOK: process.env.NEXT_PUBLIC_MAINNET_UNIPERP_HOOK as `0x${string}` || '0x0000000000000000000000000000000000000000',
  },
  // Sepolia testnet (for development)
  11155111: {
    PEPS_TOKEN: process.env.NEXT_PUBLIC_SEPOLIA_PEPS_TOKEN as `0x${string}` || '0x0000000000000000000000000000000000000000',
    UNIPERP_HOOK: process.env.NEXT_PUBLIC_SEPOLIA_UNIPERP_HOOK as `0x${string}` || '0x0000000000000000000000000000000000000000',
  },
  // Arbitrum
  42161: {
    PEPS_TOKEN: process.env.NEXT_PUBLIC_ARBITRUM_PEPS_TOKEN as `0x${string}` || '0x0000000000000000000000000000000000000000',
    UNIPERP_HOOK: process.env.NEXT_PUBLIC_ARBITRUM_UNIPERP_HOOK as `0x${string}` || '0x0000000000000000000000000000000000000000',
  },
  // Base
  8453: {
    PEPS_TOKEN: process.env.NEXT_PUBLIC_BASE_PEPS_TOKEN as `0x${string}` || '0x0000000000000000000000000000000000000000',
    UNIPERP_HOOK: process.env.NEXT_PUBLIC_BASE_UNIPERP_HOOK as `0x${string}` || '0x0000000000000000000000000000000000000000',
  },
} as const

export type SupportedChainId = keyof typeof CONTRACT_ADDRESSES

export function getContractAddress(
  chainId: SupportedChainId,
  contractName: keyof typeof CONTRACT_ADDRESSES[1]
): `0x${string}` {
  const address = CONTRACT_ADDRESSES[chainId]?.[contractName]

  if (!address || address === '0x0000000000000000000000000000000000000000') {
    console.warn(`Contract ${contractName} not configured for chain ${chainId}`)
  }

  return address as `0x${string}`
}
