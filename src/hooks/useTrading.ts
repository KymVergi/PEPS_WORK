'use client'

import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import { UNIPERP_HOOK_ABI } from '@/lib/contracts/abis'
import { getContractAddress } from '@/lib/contracts/addresses'
import type { PositionDisplay } from '@/types'
import toast from 'react-hot-toast'

export function useTrading() {
  const { address, chain } = useAccount()
  const { writeContract, data: hash } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash })

  const hookAddress = chain?.id
    ? getContractAddress(chain.id as any, 'UNIPERP_HOOK')
    : undefined

  // Current bonding curve price
  const { data: currentPriceRaw, refetch: refetchPrice } = useReadContract({
    address: hookAddress,
    abi: UNIPERP_HOOK_ABI,
    functionName: 'getCurrentPrice',
    query: { enabled: !!hookAddress, refetchInterval: 15_000 },
  })

  // TWAP price
  const { data: twapPriceRaw } = useReadContract({
    address: hookAddress,
    abi: UNIPERP_HOOK_ABI,
    functionName: 'getTWAPPrice',
    query: { enabled: !!hookAddress, refetchInterval: 30_000 },
  })

  // Curve level (total ETH flowed in)
  const { data: curveLevelRaw } = useReadContract({
    address: hookAddress,
    abi: UNIPERP_HOOK_ABI,
    functionName: 'curveLevel',
    query: { enabled: !!hookAddress, refetchInterval: 15_000 },
  })

  // Leverage unlock status (requires curveLevel >= 5 ETH)
  const { data: leverageUnlocked } = useReadContract({
    address: hookAddress,
    abi: UNIPERP_HOOK_ABI,
    functionName: 'isLeverageUnlocked',
    query: { enabled: !!hookAddress, refetchInterval: 15_000 },
  })

  // Total borrow capacity
  const { data: borrowCapacityRaw } = useReadContract({
    address: hookAddress,
    abi: UNIPERP_HOOK_ABI,
    functionName: 'getTotalBorrowCapacity',
    query: { enabled: !!hookAddress, refetchInterval: 30_000 },
  })

  // User's position
  const {
    data: positionRaw,
    refetch: refetchPosition,
  } = useReadContract({
    address: hookAddress,
    abi: UNIPERP_HOOK_ABI,
    functionName: 'positions',
    args: address ? [address] : undefined,
    query: { enabled: !!address && !!hookAddress, refetchInterval: 10_000 },
  })

  // Position health
  const { data: healthRaw, refetch: refetchHealth } = useReadContract({
    address: hookAddress,
    abi: UNIPERP_HOOK_ABI,
    functionName: 'getPositionHealth',
    args: address ? [address] : undefined,
    query: { enabled: !!address && !!hookAddress, refetchInterval: 10_000 },
  })

  // Liquidation price
  const { data: liqPriceRaw } = useReadContract({
    address: hookAddress,
    abi: UNIPERP_HOOK_ABI,
    functionName: 'getLiquidationPrice',
    args: address ? [address] : undefined,
    query: { enabled: !!address && !!hookAddress, refetchInterval: 10_000 },
  })

  // Derive display values
  const currentPrice = currentPriceRaw ? parseFloat(formatEther(currentPriceRaw as bigint)) : 0
  const twapPrice = twapPriceRaw ? parseFloat(formatEther(twapPriceRaw as bigint)) : 0
  const curveLevel = curveLevelRaw ? parseFloat(formatEther(curveLevelRaw as bigint)) : 0
  const borrowCapacity = borrowCapacityRaw ? parseFloat(formatEther(borrowCapacityRaw as bigint)) : 0

  let position: PositionDisplay | null = null
  if (positionRaw && (positionRaw as any)[6] === true) {
    const raw = positionRaw as readonly [bigint, bigint, bigint, bigint, bigint, bigint, boolean]
    const collateralETH = parseFloat(formatEther(raw[0]))
    const holdingPERP = parseFloat(formatEther(raw[1]))
    const debtETH = parseFloat(formatEther(raw[2]))
    const leverage = Number(raw[3])
    const entryPriceETH = parseFloat(formatEther(raw[4]))
    const liqPriceETH = liqPriceRaw ? parseFloat(formatEther(liqPriceRaw as bigint)) : 0
    const health = healthRaw ? Number(healthRaw as bigint) : 0
    const positionValueETH = holdingPERP * currentPrice
    const pnlETH = positionValueETH - debtETH - collateralETH
    const pnlPercent = collateralETH > 0 ? (pnlETH / collateralETH) * 100 : 0

    position = {
      collateralETH,
      holdingPERP,
      debtETH,
      leverage,
      entryPriceETH,
      currentPriceETH: currentPrice,
      liqPriceETH,
      health,
      pnlETH,
      pnlPercent,
      isOpen: true,
    }
  }

  // Open a leveraged long position (ETH payable)
  const openPosition = async ({
    collateralETH,
    leverage,
  }: {
    collateralETH: string
    leverage: number
  }) => {
    if (!address || !chain) {
      toast.error('Connect your wallet first')
      return
    }
    if (!leverageUnlocked) {
      toast.error('Leverage not yet unlocked — curve needs to reach 5 ETH')
      return
    }

    try {
      const collateralWei = parseEther(collateralETH)

      toast.loading('Opening long position...', { id: 'openPos' })

      await writeContract({
        address: getContractAddress(chain.id as any, 'UNIPERP_HOOK'),
        abi: UNIPERP_HOOK_ABI,
        functionName: 'openPosition',
        args: [collateralWei, BigInt(leverage)],
        value: collateralWei,
      })

      toast.success(`Long ${leverage}x position opened!`, { id: 'openPos' })
      refetchPosition()
      refetchHealth()
      refetchPrice()
    } catch (error: any) {
      console.error('Error opening position:', error)
      const msg = error?.shortMessage || error?.message || 'Failed to open position'
      toast.error(msg, { id: 'openPos' })
    }
  }

  // Close position - perpAmount = 0 closes the full position
  const closePosition = async (perpAmount: bigint = 0n) => {
    if (!address || !chain) {
      toast.error('Connect your wallet first')
      return
    }
    if (!position?.isOpen) {
      toast.error('No open position found')
      return
    }

    try {
      toast.loading('Closing position...', { id: 'closePos' })

      await writeContract({
        address: getContractAddress(chain.id as any, 'UNIPERP_HOOK'),
        abi: UNIPERP_HOOK_ABI,
        functionName: 'closePosition',
        args: [perpAmount],
      })

      toast.success('Position closed!', { id: 'closePos' })
      refetchPosition()
      refetchHealth()
      refetchPrice()
    } catch (error: any) {
      console.error('Error closing position:', error)
      const msg = error?.shortMessage || error?.message || 'Failed to close position'
      toast.error(msg, { id: 'closePos' })
    }
  }

  return {
    position,
    currentPrice,
    twapPrice,
    curveLevel,
    borrowCapacity,
    leverageUnlocked: !!leverageUnlocked,
    openPosition,
    closePosition,
    isConfirming,
    isConfirmed,
    refetchPosition,
  }
}
