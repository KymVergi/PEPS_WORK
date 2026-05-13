# 🔗 Blockchain Integration Guide

## Overview
$PEPS now includes full Web3 integration with Wagmi v2, RainbowKit, and Viem for connecting to smart contracts.

---

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

```bash
# Copy the example file
cp .env.example .env.local
```

Edit `.env.local` and add:

```env
# Required
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here

# For development
NEXT_PUBLIC_ENABLE_TESTNETS=true

# Contract addresses (after deployment)
NEXT_PUBLIC_SEPOLIA_PEPS_TOKEN=0x...
NEXT_PUBLIC_SEPOLIA_TRADING_CONTRACT=0x...
# ... etc
```

**📖 See [ENV_SETUP.md](ENV_SETUP.md) for complete guide.**

### 3. Get WalletConnect Project ID

1. Go to [https://cloud.walletconnect.com](https://cloud.walletconnect.com)
2. Create a new project
3. Copy your Project ID
4. Paste in `.env.local`

### 4. Deploy Smart Contracts

You need to deploy 4 contracts:
1. **PEPS Token** - ERC20 token
2. **Trading Contract** - Perpetuals trading logic
3. **Staking Contract** - Token staking with rewards
4. **Oracle Contract** - Price feed aggregator

### 4. Update Contract Addresses

After deploying, update `.env.local`:

```env
# Sepolia testnet
NEXT_PUBLIC_SEPOLIA_PEPS_TOKEN=0xYourTokenAddress
NEXT_PUBLIC_SEPOLIA_TRADING_CONTRACT=0xYourTradingAddress
NEXT_PUBLIC_SEPOLIA_STAKING_CONTRACT=0xYourStakingAddress
NEXT_PUBLIC_SEPOLIA_ORACLE_CONTRACT=0xYourOracleAddress

# Repeat for other networks (mainnet, arbitrum, base)
```

**Note**: Contract addresses are automatically loaded from environment variables. No need to edit code files!

---

## 📋 Smart Contract Requirements

### PEPS Token (ERC20)
Standard ERC20 with:
- `approve(address spender, uint256 amount)` ✅
- `balanceOf(address account)` ✅
- `decimals()` ✅

### Trading Contract
Required functions:
- `openPosition(bool isLong, uint256 collateralAmount, uint256 leverage)` ✅
- `closePosition(uint256 positionId)` ✅
- `getUserPositions(address user)` ✅
- `getPosition(uint256 positionId)` ✅

Position struct should include:
```solidity
struct Position {
    uint256 id;
    address trader;
    bool isLong;
    uint256 size;
    uint256 collateral;
    uint256 leverage;
    uint256 entryPrice;
    uint256 liquidationPrice;
    bool isOpen;
}
```

### Staking Contract
Required functions:
- `stake(uint256 amount, uint256 lockPeriod)` ✅
- `unstake(uint256 amount)` ✅
- `claimRewards()` ✅
- `getStakeInfo(address user)` ✅

StakeInfo struct:
```solidity
struct StakeInfo {
    uint256 amount;
    uint256 rewards;
    uint256 lockUntil;
}
```

### Oracle Contract
Required functions:
- `getLatestPrice()` ✅
- `getPriceData()` ✅

PriceData struct:
```solidity
struct PriceData {
    uint256 price;
    uint256 timestamp;
    int256 change24h;
}
```

---

## 🎯 Custom Hooks Usage

### useTrading
```typescript
import { useTrading } from '@/hooks/useTrading'

function Component() {
  const { openPosition, closePosition, userPositions } = useTrading()

  const handleOpen = async () => {
    await openPosition({
      isLong: true,
      collateralAmount: '1.0',
      leverage: 3,
      collateralToken: 'ETH'
    })
  }
}
```

### useStaking
```typescript
import { useStaking } from '@/hooks/useStaking'

function Component() {
  const { stake, unstake, claimRewards, stakeInfo } = useStaking()

  const handleStake = async () => {
    await stake({
      amount: '100',
      lockPeriodDays: 90
    })
  }
}
```

### useTokenBalance
```typescript
import { useTokenBalance } from '@/hooks/useTokenBalance'

function Component() {
  const { ethBalance, pepsBalance } = useTokenBalance()

  return (
    <div>
      <p>ETH: {ethBalance}</p>
      <p>PEPS: {pepsBalance}</p>
    </div>
  )
}
```

---

## 🚀 Features Implemented

✅ **Wallet Connection**
- RainbowKit integration
- Multi-wallet support (MetaMask, WalletConnect, Coinbase, etc.)
- Network switching
- Custom dark theme

✅ **Trading**
- Open Long/Short positions
- Dynamic leverage (2x-5x)
- Collateral selection (ETH/PEPS)
- Real-time calculations
- Toast notifications

✅ **Staking**
- Stake PEPS tokens
- Multiple lock periods (30, 90, 180, 365 days)
- Claim rewards
- Unstake with cooldown

✅ **Token Balances**
- Real ETH balance
- Real PEPS balance
- Auto-refresh on transactions

---

## 🧪 Testing on Testnet

### 1. Get Testnet ETH
- Sepolia: [https://sepoliafaucet.com](https://sepoliafaucet.com)
- Base Sepolia: [https://www.coinbase.com/faucets/base-ethereum-goerli-faucet](https://www.coinbase.com/faucets/base-ethereum-goerli-faucet)

### 2. Add Testnet PEPS
After deploying your token, add it to MetaMask:
- Contract Address: Your PEPS token address
- Symbol: PEPS
- Decimals: 18

### 3. Test Flows

**Trading Flow:**
1. Connect wallet
2. Get testnet ETH
3. Open a position
4. Check transaction on Etherscan
5. Close position

**Staking Flow:**
1. Approve PEPS
2. Stake tokens
3. Wait for rewards
4. Claim rewards
5. Unstake

---

## 📝 Environment Variables (Optional)

Create `.env.local`:
```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_ENABLE_TESTNETS=true
```

---

## 🔐 Security Notes

⚠️ **Important:**
- Never commit private keys
- Use environment variables for sensitive data
- Test thoroughly on testnet first
- Audit smart contracts before mainnet
- Implement proper access controls
- Add emergency pause mechanisms

---

## 🐛 Troubleshooting

### "User rejected the request"
- User canceled transaction in wallet
- Normal behavior, no action needed

### "Insufficient funds"
- User doesn't have enough tokens
- Check balance with useTokenBalance

### "Transaction reverted"
- Check contract logic
- Verify approval was given
- Check console for error details

### RainbowKit not appearing
- Check WalletConnect Project ID
- Ensure Providers wraps your app
- Check browser console

---

## 📚 Additional Resources

- [Wagmi Docs](https://wagmi.sh)
- [RainbowKit Docs](https://www.rainbowkit.com)
- [Viem Docs](https://viem.sh)
- [Ethers.js Migration](https://wagmi.sh/react/guides/migrate-from-ethers)

---

## 🎉 Next Steps

1. ✅ Wallet connection working
2. ✅ Custom hooks created
3. ⏳ Deploy smart contracts
4. ⏳ Update contract addresses
5. ⏳ Test on testnet
6. ⏳ Add oracle price feeds
7. ⏳ Implement liquidation monitoring
8. ⏳ Add transaction history
9. ⏳ Mainnet deployment

---

**Status:** Ready for Smart Contract Integration  
**Last Updated:** 2024-01-15
