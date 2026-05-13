'use client'

import { useAccount, useReadContract, useBalance } from 'wagmi'
import { formatUnits } from 'viem'
import { PEPS_TOKEN_ABI } from '@/lib/contracts/abis'
import { getContractAddress } from '@/lib/contracts/addresses'

export function useTokenBalance() {
  const { address, chain } = useAccount()

  // Get ETH balance
  const { data: ethBalance } = useBalance({
    address,
  })

  // Get PEPS balance
  const { data: pepsBalance, refetch: refetchPepsBalance } = useReadContract({
    address: chain?.id ? getContractAddress(chain.id as any, 'PEPS_TOKEN') : undefined,
    abi: PEPS_TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && !!chain,
    }
  })

  return {
    ethBalance: ethBalance?.value ? parseFloat(formatUnits(ethBalance.value, 18)) : 0,
    pepsBalance: pepsBalance ? parseFloat(formatUnits(pepsBalance as bigint, 18)) : 0,
    ethBalanceFormatted: ethBalance?.formatted || '0',
    pepsBalanceFormatted: pepsBalance ? formatUnits(pepsBalance as bigint, 18) : '0',
    refetchPepsBalance,
  }
}
