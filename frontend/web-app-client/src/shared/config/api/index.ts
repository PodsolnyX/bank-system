import { getEnvVar } from 'shared/config/env'

export const API_BASE_URL = getEnvVar('VITE_API_URL')

const path = (...parts: string[]) => {
  return [API_BASE_URL, ...parts].join('/')
}

export const API_AUTH = path('auth')
export const API_ACCOUNTS = path('accounts')
export const API_LOANS = path('loans')
export const API_OPERATIONS = path('operations')
export const API_USER = path('user')
