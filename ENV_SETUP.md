# 🔐 Environment Variables Setup Guide

## Quick Start

### 1. Copy the example file
```bash
cp .env.example .env.local
```

### 2. Fill in required variables
```bash
# Open .env.local in your editor
nano .env.local  # or code .env.local
```

### 3. Minimum required variables
```env
# This is REQUIRED - get it from https://cloud.walletconnect.com
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=abc123...

# For development, enable testnets
NEXT_PUBLIC_ENABLE_TESTNETS=true
```

### 4. Run the app
```bash
npm run dev
```

---

## 📋 Variable Reference

### Required Variables

#### `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
**Required**: Yes  
**Where to get**: [WalletConnect Cloud](https://cloud.walletconnect.com)  
**Purpose**: Enables wallet connection through WalletConnect

**How to get:**
1. Go to https://cloud.walletconnect.com
2. Sign up / Log in
3. Create a new project
4. Copy the Project ID
5. Paste it in your `.env.local`

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=abc123def456...
```

---

### Optional Variables

#### `NEXT_PUBLIC_ENABLE_TESTNETS`
**Default**: `false`  
**Options**: `true` | `false`  
**Purpose**: Show testnet networks in wallet selector

```env
NEXT_PUBLIC_ENABLE_TESTNETS=true
```

#### `NEXT_PUBLIC_ENABLE_TRADING`
**Default**: `true`  
**Options**: `true` | `false`  
**Purpose**: Enable/disable trading features

```env
NEXT_PUBLIC_ENABLE_TRADING=true
```

#### `NEXT_PUBLIC_ENABLE_STAKING`
**Default**: `true`  
**Options**: `true` | `false`  
**Purpose**: Enable/disable staking features

```env
NEXT_PUBLIC_ENABLE_STAKING=true
```

#### `NEXT_PUBLIC_MAINTENANCE_MODE`
**Default**: `false`  
**Options**: `true` | `false`  
**Purpose**: Put site in maintenance mode

```env
NEXT_PUBLIC_MAINTENANCE_MODE=false
```

---

## 🔗 Smart Contract Addresses

### When to fill these
Only fill these after you've deployed your smart contracts.

### Mainnet (Chain ID: 1)
```env
NEXT_PUBLIC_MAINNET_PEPS_TOKEN=0x...
NEXT_PUBLIC_MAINNET_TRADING_CONTRACT=0x...
NEXT_PUBLIC_MAINNET_STAKING_CONTRACT=0x...
NEXT_PUBLIC_MAINNET_ORACLE_CONTRACT=0x...
```

### Sepolia Testnet (Chain ID: 11155111)
```env
NEXT_PUBLIC_SEPOLIA_PEPS_TOKEN=0x...
NEXT_PUBLIC_SEPOLIA_TRADING_CONTRACT=0x...
NEXT_PUBLIC_SEPOLIA_STAKING_CONTRACT=0x...
NEXT_PUBLIC_SEPOLIA_ORACLE_CONTRACT=0x...
```

### Arbitrum (Chain ID: 42161)
```env
NEXT_PUBLIC_ARBITRUM_PEPS_TOKEN=0x...
NEXT_PUBLIC_ARBITRUM_TRADING_CONTRACT=0x...
NEXT_PUBLIC_ARBITRUM_STAKING_CONTRACT=0x...
NEXT_PUBLIC_ARBITRUM_ORACLE_CONTRACT=0x...
```

### Base (Chain ID: 8453)
```env
NEXT_PUBLIC_BASE_PEPS_TOKEN=0x...
NEXT_PUBLIC_BASE_TRADING_CONTRACT=0x...
NEXT_PUBLIC_BASE_STAKING_CONTRACT=0x...
NEXT_PUBLIC_BASE_ORACLE_CONTRACT=0x...
```

---

## 🔑 API Keys (Optional)

### Alchemy
Get from: https://www.alchemy.com
```env
NEXT_PUBLIC_ALCHEMY_API_KEY=your_key_here
```

### Infura
Get from: https://infura.io
```env
NEXT_PUBLIC_INFURA_API_KEY=your_key_here
```

### Etherscan (for contract verification)
Get from: https://etherscan.io/myapikey
```env
ETHERSCAN_API_KEY=your_key_here
```

---

## 📊 Analytics (Optional)

### Google Analytics
```env
NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX
```

### Mixpanel
```env
NEXT_PUBLIC_MIXPANEL_TOKEN=your_token_here
```

---

## 🚨 Security Best Practices

### ✅ DO:
- Keep `.env.local` in `.gitignore` (already done)
- Use `NEXT_PUBLIC_` prefix for browser-accessible vars
- Never commit `.env.local` to git
- Use different values for dev/staging/prod
- Rotate API keys periodically

### ❌ DON'T:
- Don't put private keys in env files
- Don't share your `.env.local` file
- Don't commit env files to git
- Don't use production keys in development

---

## 🔍 Troubleshooting

### "NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set"
**Solution**: You didn't copy `.env.example` to `.env.local` or forgot to fill the Project ID.

```bash
cp .env.example .env.local
# Then edit .env.local and add your Project ID
```

### "Contract not configured for chain X"
**Solution**: You need to add contract addresses for that chain in your `.env.local`

```env
NEXT_PUBLIC_SEPOLIA_PEPS_TOKEN=0xYourAddress...
```

### Changes not taking effect
**Solution**: Restart the dev server after changing env vars

```bash
# Stop the server (Ctrl+C)
npm run dev
```

### "Invalid Project ID"
**Solution**: Make sure you copied the full Project ID from WalletConnect Cloud (it's long!)

---

## 📝 Example .env.local

Here's a complete example for **development on Sepolia testnet**:

```env
# Required
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=a1b2c3d4e5f6g7h8i9j0

# Enable testnets
NEXT_PUBLIC_ENABLE_TESTNETS=true

# Sepolia contract addresses
NEXT_PUBLIC_SEPOLIA_PEPS_TOKEN=0x1234567890123456789012345678901234567890
NEXT_PUBLIC_SEPOLIA_TRADING_CONTRACT=0x2345678901234567890123456789012345678901
NEXT_PUBLIC_SEPOLIA_STAKING_CONTRACT=0x3456789012345678901234567890123456789012
NEXT_PUBLIC_SEPOLIA_ORACLE_CONTRACT=0x4567890123456789012345678901234567890123

# Optional
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_key
```

---

## 🎯 Environment Files

### `.env.example`
Template file with all available variables. **Committed to git**.

### `.env.local`
Your local development config. **NOT committed to git**.

### `.env.production`
Production configuration. **NOT committed to git**.

### `.env.test`
Test environment configuration. **NOT committed to git**.

---

## 📚 Resources

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [WalletConnect Cloud](https://cloud.walletconnect.com)
- [Alchemy Dashboard](https://dashboard.alchemy.com)
- [Infura Dashboard](https://infura.io/dashboard)

---

**Last Updated**: 2024-01-15
