'use client'

import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseUnits } from 'viem'
import { STAKING_CONTRACT_ABI, PEPS_TOKEN_ABI } from '@/lib/contracts/abis'
import { getContractAddress } from '@/lib/contracts/addresses'
import toast from 'react-hot-toast'

export function useStaking() {
  const { address, chain } = useAccount()
  const { writeContract, data: hash } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash })

  // Get stake info
  const { data: stakeInfo, refetch: refetchStakeInfo } = useReadContract({
    address: chain?.id ? getContractAddress(chain.id as any, 'STAKING_CONTRACT') : undefined,
    abi: STAKING_CONTRACT_ABI,
    functionName: 'getStakeInfo',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && !!chain,
    }
  })

  // Stake tokens
  const stake = async ({
    amount,
    lockPeriodDays,
  }: {
    amount: string
    lockPeriodDays: number
  }) => {
    if (!address || !chain) {
      toast.error('Please connect your wallet')
      return
    }

    try {
      const amountBigInt = parseUnits(amount, 18)
      const lockPeriod = BigInt(lockPeriodDays * 24 * 60 * 60) // Convert days to seconds

      // Approve PEPS first
      toast.loading('Approving PEPS...', { id: 'approve' })
      
      await writeContract({
        address: getContractAddress(chain.id as any, 'PEPS_TOKEN'),
        abi: PEPS_TOKEN_ABI,
        functionName: 'approve',
        args: [getContractAddress(chain.id as any, 'STAKING_CONTRACT'), amountBigInt],
      })

      toast.success('PEPS approved!', { id: 'approve' })

      // Stake
      toast.loading('Staking PEPS...', { id: 'stake' })
      
      await writeContract({
        address: getContractAddress(chain.id as any, 'STAKING_CONTRACT'),
        abi: STAKING_CONTRACT_ABI,
        functionName: 'stake',
        args: [amountBigInt, lockPeriod],
      })

      toast.success(`Successfully staked ${amount} PEPS!`, { id: 'stake' })
      refetchStakeInfo()
    } catch (error: any) {
      console.error('Error staking:', error)
      toast.error(error.message || 'Failed to stake', { id: 'stake' })
    }
  }

  // Unstake tokens
  const unstake = async (amount: string) => {
    if (!address || !chain) {
      toast.error('Please connect your wallet')
      return
    }

    try {
      const amountBigInt = parseUnits(amount, 18)

      toast.loading('Unstaking PEPS...', { id: 'unstake' })
      
      await writeContract({
        address: getContractAddress(chain.id as any, 'STAKING_CONTRACT'),
        abi: STAKING_CONTRACT_ABI,
        functionName: 'unstake',
        args: [amountBigInt],
      })

      toast.success(`Successfully unstaked ${amount} PEPS!`, { id: 'unstake' })
      refetchStakeInfo()
    } catch (error: any) {
      console.error('Error unstaking:', error)
      toast.error(error.message || 'Failed to unstake', { id: 'unstake' })
    }
  }

  // Claim rewards
  const claimRewards = async () => {
    if (!address || !chain) {
      toast.error('Please connect your wallet')
      return
    }

    try {
      toast.loading('Claiming rewards...', { id: 'claim' })
      
      await writeContract({
        address: getContractAddress(chain.id as any, 'STAKING_CONTRACT'),
        abi: STAKING_CONTRACT_ABI,
        functionName: 'claimRewards',
      })

      toast.success('Rewards claimed!', { id: 'claim' })
      refetchStakeInfo()
    } catch (error: any) {
      console.error('Error claiming rewards:', error)
      toast.error(error.message || 'Failed to claim rewards', { id: 'claim' })
    }
  }

  return {
    stakeInfo: stakeInfo as { amount: bigint; rewards: bigint; lockUntil: bigint } | undefined,
    stake,
    unstake,
    claimRewards,
    isConfirming,
    isConfirmed,
    refetchStakeInfo,
  }
}
