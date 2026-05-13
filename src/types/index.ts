// Types for the Peptide Perps platform

export type PositionType = 'long' | 'short'

export type CollateralType = 'ETH' | 'PEPS'

export interface Position {
  id: string
  type: PositionType
  size: number
  leverage: number
  collateral: number
  collateralType: CollateralType
  entryPrice: number
  currentPrice: number
  liquidationPrice: number
  pnl: number
  pnlPercent: number
  timestamp: number
  isOpen: boolean
}

export interface OracleData {
  currentPrice: number
  change24h: number
  changePercent24h: number
  high24h: number
  low24h: number
  volume24h: number
  lastUpdate: number
}

export interface UserStats {
  totalPositionsOpened: number
  totalVolume: number
  totalPnl: number
  winRate: number
  avgLeverage: number
}

export interface StakingData {
  stakedAmount: number
  rewardsEarned: number
  apy: number
  lockEndDate?: number
}

export interface WalletData {
  address: string
  ethBalance: number
  pepsBalance: number
  isConnected: boolean
}

export interface TradeParams {
  type: PositionType
  collateralAmount: number
  collateralType: CollateralType
  leverage: number
  slippage?: number
}

export interface CalculatedPosition {
  positionSize: number
  entryPrice: number
  liquidationPrice: number
  healthFactor: number
  estimatedFee: number
  requiredCollateral: number
}
