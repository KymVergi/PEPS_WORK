// PEPS Token ERC20 ABI
export const PEPS_TOKEN_ABI = [
  {
    inputs: [{ name: 'spender', type: 'address' }, { name: 'amount', type: 'uint256' }],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'owner', type: 'address' }, { name: 'spender', type: 'address' }],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

// UniperpHook main contract ABI
export const UNIPERP_HOOK_ABI = [
  // ============ Core Trading ============
  {
    inputs: [
      { name: 'collateral', type: 'uint256' },
      { name: 'leverage', type: 'uint256' },
    ],
    name: 'openPosition',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ name: 'perpAmount', type: 'uint256' }],
    name: 'closePosition',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'user', type: 'address' }],
    name: 'liquidate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },

  // ============ Spot Trading ============
  {
    inputs: [{ name: 'ethAmount', type: 'uint256' }],
    name: 'buyPepsDirectly',
    outputs: [{ name: 'pepsOut', type: 'uint256' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ name: 'pepsAmount', type: 'uint256' }],
    name: 'sellPepsDirectly',
    outputs: [{ name: 'ethOut', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },

  // ============ Staking ============
  {
    inputs: [{ name: 'amount', type: 'uint256' }],
    name: 'stake',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'amount', type: 'uint256' }],
    name: 'unstake',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'claimRewards',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'user', type: 'address' }],
    name: 'pendingRewards',
    outputs: [{ name: 'pending', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },

  // ============ Position Views ============
  {
    inputs: [{ name: 'user', type: 'address' }],
    name: 'positions',
    outputs: [
      { name: 'collateral', type: 'uint256' },
      { name: 'holding', type: 'uint256' },
      { name: 'debt', type: 'uint256' },
      { name: 'leverage', type: 'uint256' },
      { name: 'entryPrice', type: 'uint256' },
      { name: 'openBlock', type: 'uint256' },
      { name: 'isOpen', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'user', type: 'address' }],
    name: 'getPositionHealth',
    outputs: [{ name: 'health', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'user', type: 'address' }],
    name: 'getLiquidationPrice',
    outputs: [{ name: 'liqPrice', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },

  // ============ Curve Views ============
  {
    inputs: [],
    name: 'getCurrentPrice',
    outputs: [{ name: 'price', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getTWAPPrice',
    outputs: [{ name: 'twapPrice', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'isLeverageUnlocked',
    outputs: [{ name: 'unlocked', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getTotalBorrowCapacity',
    outputs: [{ name: 'capacity', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'bandIndex', type: 'uint256' }],
    name: 'getBandInfo',
    outputs: [
      { name: 'perpAmount', type: 'uint256' },
      { name: 'ethAmount', type: 'uint256' },
      { name: 'borrowed', type: 'uint256' },
      { name: 'available', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },

  // ============ State Variables ============
  {
    inputs: [],
    name: 'curveLevel',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'realPerpInCurve',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'badDebt',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalStaked',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'user', type: 'address' }],
    name: 'claimableETH',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'user', type: 'address' }],
    name: 'stakes',
    outputs: [
      { name: 'amount', type: 'uint256' },
      { name: 'rewardDebt', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pepsToken',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },

  // ============ Events ============
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'user', type: 'address' },
      { indexed: false, name: 'collateral', type: 'uint256' },
      { indexed: false, name: 'leverage', type: 'uint256' },
      { indexed: false, name: 'holding', type: 'uint256' },
      { indexed: false, name: 'debt', type: 'uint256' },
    ],
    name: 'PositionOpened',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'user', type: 'address' },
      { indexed: false, name: 'perpSold', type: 'uint256' },
      { indexed: false, name: 'ethReceived', type: 'uint256' },
      { indexed: false, name: 'profit', type: 'uint256' },
    ],
    name: 'PositionClosed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'user', type: 'address' },
      { indexed: true, name: 'liquidator', type: 'address' },
      { indexed: false, name: 'perpSold', type: 'uint256' },
      { indexed: false, name: 'ethRecovered', type: 'uint256' },
    ],
    name: 'PositionLiquidated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'user', type: 'address' },
      { indexed: false, name: 'amount', type: 'uint256' },
    ],
    name: 'Staked',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'user', type: 'address' },
      { indexed: false, name: 'amount', type: 'uint256' },
    ],
    name: 'RewardsClaimed',
    type: 'event',
  },
] as const
