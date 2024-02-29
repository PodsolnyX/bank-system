import { getEnvVar } from 'shared/config/env'

export const API_BASE_URL = getEnvVar('VITE_API_URL')

const path = (...parts: string[]) => {
  return [API_BASE_URL, ...parts].join('/')
}

export const API_AUTH = path('auth')
export const API_ACCOUNTS = path('account')
export const API_LOANS = path('loan')
export const API_OPERATIONS = path('operationHistory')
export const API_USER = path('user')
