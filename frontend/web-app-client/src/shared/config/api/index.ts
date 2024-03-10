import { getEnvVar } from 'shared/config/env'

export const API_BASE_URL = getEnvVar('VITE_API_URL')

const path = (...parts: string[]) => {
  return [API_BASE_URL, ...parts].join('/')
}

export const API_USER = path('auth/user')
export const API_ACCOUNTS = path('account/user')
export const API_TARIFFS = path('tariff/user')
export const API_LOANS = path('loan/user')
export const API_OPERATIONS = path('operation-history/user')
