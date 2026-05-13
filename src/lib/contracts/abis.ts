// PEPS Token Contract ABI
export const PEPS_TOKEN_ABI = [
  {
    "inputs": [{"name": "spender", "type": "address"}, {"name": "amount", "type": "uint256"}],
    "name": "approve",
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "account", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [{"name": "", "type": "uint8"}],
    "stateMutability": "view",
    "type": "function"
  },
] as const

// Trading Contract ABI
export const TRADING_CONTRACT_ABI = [
  {
    "inputs": [
      {"name": "isLong", "type": "bool"},
      {"name": "collateralAmount", "type": "uint256"},
      {"name": "leverage", "type": "uint256"}
    ],
    "name": "openPosition",
    "outputs": [{"name": "positionId", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "positionId", "type": "uint256"}],
    "name": "closePosition",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "user", "type": "address"}],
    "name": "getUserPositions",
    "outputs": [{"name": "", "type": "uint256[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"name": "positionId", "type": "uint256"}],
    "name": "getPosition",
    "outputs": [
      {
        "components": [
          {"name": "id", "type": "uint256"},
          {"name": "trader", "type": "address"},
          {"name": "isLong", "type": "bool"},
          {"name": "size", "type": "uint256"},
          {"name": "collateral", "type": "uint256"},
          {"name": "leverage", "type": "uint256"},
          {"name": "entryPrice", "type": "uint256"},
          {"name": "liquidationPrice", "type": "uint256"},
          {"name": "isOpen", "type": "bool"}
        ],
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
] as const

// Staking Contract ABI
export const STAKING_CONTRACT_ABI = [
  {
    "inputs": [
      {"name": "amount", "type": "uint256"},
      {"name": "lockPeriod", "type": "uint256"}
    ],
    "name": "stake",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "amount", "type": "uint256"}],
    "name": "unstake",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "claimRewards",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "user", "type": "address"}],
    "name": "getStakeInfo",
    "outputs": [
      {
        "components": [
          {"name": "amount", "type": "uint256"},
          {"name": "rewards", "type": "uint256"},
          {"name": "lockUntil", "type": "uint256"}
        ],
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
] as const

// Oracle Contract ABI
export const ORACLE_CONTRACT_ABI = [
  {
    "inputs": [],
    "name": "getLatestPrice",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getPriceData",
    "outputs": [
      {
        "components": [
          {"name": "price", "type": "uint256"},
          {"name": "timestamp", "type": "uint256"},
          {"name": "change24h", "type": "int256"}
        ],
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
] as const
