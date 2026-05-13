// Types for Uniperp - PEPS perpetuals on bonding curve

// On-chain position struct (mirrors UniperpHook.Position)
export interface Position {
  collateral: bigint    // ETH collateral deposited
  holding: bigint       // PERP tokens held
  debt: bigint          // ETH debt owed to curve
  leverage: bigint      // Leverage multiplier (2-5)
  entryPrice: bigint    // Entry price in wei per PERP
  openBlock: bigint     // Block when opened
  isOpen: boolean
}

// Derived position data for display
export interface PositionDisplay {
  collateralETH: number
  holdingPERP: number
  debtETH: number
  leverage: number
  entryPriceETH: number
  currentPriceETH: number
  liqPriceETH: number
  health: number        // health ratio (e.g. 150 = 150%)
  pnlETH: number
  pnlPercent: number
  isOpen: boolean
}

// Bonding curve / market data
export interface CurveData {
  currentPrice: number   // ETH per PERP (from getCurrentPrice)
  twapPrice: number      // TWAP price (from getTWAPPrice)
  curveLevel: number     // Total ETH flowed into curve (wei → ETH)
  realPerpInCurve: number
  totalBorrowCapacity: number
  badDebt: number
  leverageUnlocked: boolean
}

// User staking data
export interface StakingData {
  stakedPERP: number
  pendingETH: number     // Pending ETH rewards
  claimableETH: number   // Already claimable ETH
  totalStakedProtocol: number
}

export interface WalletData {
  address: string
  ethBalance: number
  pepsBalance: number
  isConnected: boolean
}

// Parameters for opening a position
export interface OpenPositionParams {
  collateralETH: string   // ETH amount as string input
  leverage: number        // 2 | 3 | 4 | 5
}

// Calculated position preview (before submitting)
export interface PositionPreview {
  totalBuyETH: number      // collateral + borrowed
  estimatedPERP: number    // approximate PERP received
  borrowAmount: number     // ETH borrowed from bands
  originationFee: number   // 1% of borrow
  liqPriceApprox: number   // approximate liquidation price
  healthApprox: number     // approximate starting health
}
