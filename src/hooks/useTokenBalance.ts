'use client'

import { useAccount, useReadContract, useBalance } from 'wagmi'
import { formatEther, formatUnits } from 'viem'
import { PEPS_TOKEN_ABI } from '@/lib/contracts/abis'
import { getContractAddress } from '@/lib/contracts/addresses'

export function useTokenBalance() {
  const { address, chain } = useAccount()

  // ETH balance
  const { data: ethBalanceData } = useBalance({ address })

  // PEPS balance
  const { data: pepsBalanceRaw, refetch: refetchPepsBalance } = useReadContract({
    address: chain?.id ? getContractAddress(chain.id as any, 'PEPS_TOKEN') : undefined,
    abi: PEPS_TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: !!address && !!chain, refetchInterval: 15_000 },
  })

  const ethBalance = ethBalanceData?.value ? parseFloat(formatEther(ethBalanceData.value)) : 0
  const pepsBalance = pepsBalanceRaw ? parseFloat(formatUnits(pepsBalanceRaw as bigint, 18)) : 0

  return {
    ethBalance,
    pepsBalance,
    ethBalanceFormatted: ethBalanceData?.formatted || '0',
    pepsBalanceFormatted: pepsBalanceRaw ? formatUnits(pepsBalanceRaw as bigint, 18) : '0',
    refetchPepsBalance,
  }
}
