'use client'

import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import { UNIPERP_HOOK_ABI, PEPS_TOKEN_ABI } from '@/lib/contracts/abis'
import { getContractAddress } from '@/lib/contracts/addresses'
import toast from 'react-hot-toast'

export function useStaking() {
  const { address, chain } = useAccount()
  const { writeContract, data: hash } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash })

  const hookAddress = chain?.id
    ? getContractAddress(chain.id as any, 'UNIPERP_HOOK')
    : undefined

  // User's staked amount and reward debt
  const { data: stakesRaw, refetch: refetchStakes } = useReadContract({
    address: hookAddress,
    abi: UNIPERP_HOOK_ABI,
    functionName: 'stakes',
    args: address ? [address] : undefined,
    query: { enabled: !!address && !!hookAddress, refetchInterval: 15_000 },
  })

  // Pending ETH rewards
  const { data: pendingRaw, refetch: refetchPending } = useReadContract({
    address: hookAddress,
    abi: UNIPERP_HOOK_ABI,
    functionName: 'pendingRewards',
    args: address ? [address] : undefined,
    query: { enabled: !!address && !!hookAddress, refetchInterval: 10_000 },
  })

  // Claimable ETH (from positions closed / liquidated)
  const { data: claimableRaw, refetch: refetchClaimable } = useReadContract({
    address: hookAddress,
    abi: UNIPERP_HOOK_ABI,
    functionName: 'claimableETH',
    args: address ? [address] : undefined,
    query: { enabled: !!address && !!hookAddress, refetchInterval: 10_000 },
  })

  // Total staked across the protocol
  const { data: totalStakedRaw } = useReadContract({
    address: hookAddress,
    abi: UNIPERP_HOOK_ABI,
    functionName: 'totalStaked',
    query: { enabled: !!hookAddress, refetchInterval: 30_000 },
  })

  const stakedPERP = stakesRaw
    ? parseFloat(formatEther((stakesRaw as readonly [bigint, bigint])[0]))
    : 0
  const pendingETH = pendingRaw ? parseFloat(formatEther(pendingRaw as bigint)) : 0
  const claimableETH = claimableRaw ? parseFloat(formatEther(claimableRaw as bigint)) : 0
  const totalStakedProtocol = totalStakedRaw ? parseFloat(formatEther(totalStakedRaw as bigint)) : 0

  const refetchAll = () => {
    refetchStakes()
    refetchPending()
    refetchClaimable()
  }

  // Stake PEPS (requires approval first)
  const stake = async (amount: string) => {
    if (!address || !chain) {
      toast.error('Connect your wallet first')
      return
    }

    try {
      const amountWei = parseEther(amount)
      const hookAddr = getContractAddress(chain.id as any, 'UNIPERP_HOOK')
      const pepsAddr = getContractAddress(chain.id as any, 'PEPS_TOKEN')

      // Approve PEPS spend on the hook
      toast.loading('Approving PEPS...', { id: 'stake' })
      await writeContract({
        address: pepsAddr,
        abi: PEPS_TOKEN_ABI,
        functionName: 'approve',
        args: [hookAddr, amountWei],
      })

      toast.loading('Staking PEPS...', { id: 'stake' })
      await writeContract({
        address: hookAddr,
        abi: UNIPERP_HOOK_ABI,
        functionName: 'stake',
        args: [amountWei],
      })

      toast.success(`${amount} PEPS staked!`, { id: 'stake' })
      refetchAll()
    } catch (error: any) {
      console.error('Error staking:', error)
      const msg = error?.shortMessage || error?.message || 'Failed to stake'
      toast.error(msg, { id: 'stake' })
    }
  }

  // Unstake PEPS
  const unstake = async (amount: string) => {
    if (!address || !chain) {
      toast.error('Connect your wallet first')
      return
    }

    try {
      const amountWei = parseEther(amount)

      toast.loading('Unstaking PEPS...', { id: 'unstake' })
      await writeContract({
        address: getContractAddress(chain.id as any, 'UNIPERP_HOOK'),
        abi: UNIPERP_HOOK_ABI,
        functionName: 'unstake',
        args: [amountWei],
      })

      toast.success(`${amount} PEPS unstaked!`, { id: 'unstake' })
      refetchAll()
    } catch (error: any) {
      console.error('Error unstaking:', error)
      const msg = error?.shortMessage || error?.message || 'Failed to unstake'
      toast.error(msg, { id: 'unstake' })
    }
  }

  // Claim ETH rewards
  const claimRewards = async () => {
    if (!address || !chain) {
      toast.error('Connect your wallet first')
      return
    }
    if (pendingETH + claimableETH === 0) {
      toast.error('No rewards available')
      return
    }

    try {
      toast.loading('Claiming ETH rewards...', { id: 'claim' })
      await writeContract({
        address: getContractAddress(chain.id as any, 'UNIPERP_HOOK'),
        abi: UNIPERP_HOOK_ABI,
        functionName: 'claimRewards',
      })

      toast.success('ETH rewards claimed!', { id: 'claim' })
      refetchAll()
    } catch (error: any) {
      console.error('Error claiming rewards:', error)
      const msg = error?.shortMessage || error?.message || 'Failed to claim rewards'
      toast.error(msg, { id: 'claim' })
    }
  }

  return {
    stakedPERP,
    pendingETH,
    claimableETH,
    totalStakedProtocol,
    stake,
    unstake,
    claimRewards,
    isConfirming,
    isConfirmed,
    refetchAll,
  }
}
