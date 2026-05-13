'use client'

import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseUnits } from 'viem'
import { TRADING_CONTRACT_ABI, PEPS_TOKEN_ABI } from '@/lib/contracts/abis'
import { getContractAddress } from '@/lib/contracts/addresses'
import toast from 'react-hot-toast'

export function useTrading() {
  const { address, chain } = useAccount()
  const { writeContract, data: hash } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash })

  // Get user positions
  const { data: userPositions, refetch: refetchPositions } = useReadContract({
    address: chain?.id ? getContractAddress(chain.id as any, 'TRADING_CONTRACT') : undefined,
    abi: TRADING_CONTRACT_ABI,
    functionName: 'getUserPositions',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && !!chain,
    }
  })

  // Open position
  const openPosition = async ({
    isLong,
    collateralAmount,
    leverage,
    collateralToken = 'PEPS'
  }: {
    isLong: boolean
    collateralAmount: string
    leverage: number
    collateralToken?: 'ETH' | 'PEPS'
  }) => {
    if (!address || !chain) {
      toast.error('Please connect your wallet')
      return
    }

    try {
      const amount = parseUnits(collateralAmount, 18) // Assuming 18 decimals

      // If using PEPS, need to approve first
      if (collateralToken === 'PEPS') {
        toast.loading('Approving PEPS...', { id: 'approve' })
        
        await writeContract({
          address: getContractAddress(chain.id as any, 'PEPS_TOKEN'),
          abi: PEPS_TOKEN_ABI,
          functionName: 'approve',
          args: [getContractAddress(chain.id as any, 'TRADING_CONTRACT'), amount],
        })

        toast.success('PEPS approved!', { id: 'approve' })
      }

      // Open position
      toast.loading('Opening position...', { id: 'position' })
      
      await writeContract({
        address: getContractAddress(chain.id as any, 'TRADING_CONTRACT'),
        abi: TRADING_CONTRACT_ABI,
        functionName: 'openPosition',
        args: [isLong, amount, BigInt(leverage)],
      })

      toast.success(
        `${isLong ? 'Long' : 'Short'} position opened with ${leverage}x leverage!`,
        { id: 'position' }
      )
      
      refetchPositions()
    } catch (error: any) {
      console.error('Error opening position:', error)
      toast.error(error.message || 'Failed to open position', { id: 'position' })
    }
  }

  // Close position
  const closePosition = async (positionId: bigint) => {
    if (!address || !chain) {
      toast.error('Please connect your wallet')
      return
    }

    try {
      toast.loading('Closing position...', { id: 'close' })
      
      await writeContract({
        address: getContractAddress(chain.id as any, 'TRADING_CONTRACT'),
        abi: TRADING_CONTRACT_ABI,
        functionName: 'closePosition',
        args: [positionId],
      })

      toast.success('Position closed!', { id: 'close' })
      refetchPositions()
    } catch (error: any) {
      console.error('Error closing position:', error)
      toast.error(error.message || 'Failed to close position', { id: 'close' })
    }
  }

  return {
    userPositions: userPositions as bigint[] | undefined,
    openPosition,
    closePosition,
    isConfirming,
    isConfirmed,
    refetchPositions,
  }
}
