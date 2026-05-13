/**
 * Environment Variables Validation
 * Validates that required environment variables are set
 */

export function validateEnv() {
  const required = [
    'NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID',
  ]

  const missing = required.filter(key => !process.env[key])

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missing.join('\n')}\n\n` +
      'Please copy .env.example to .env.local and fill in the values.'
    )
  }
}

export function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key]
  
  if (!value && !defaultValue) {
    console.warn(`Environment variable ${key} is not set`)
    return ''
  }
  
  return value || defaultValue || ''
}

// Check if we're in development mode
export const isDev = process.env.NODE_ENV === 'development'

// Check if testnets are enabled
export const isTestnetEnabled = process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true'

// Check if trading is enabled
export const isTradingEnabled = process.env.NEXT_PUBLIC_ENABLE_TRADING !== 'false'

// Check if staking is enabled
export const isStakingEnabled = process.env.NEXT_PUBLIC_ENABLE_STAKING !== 'false'

// Check if maintenance mode
export const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true'
