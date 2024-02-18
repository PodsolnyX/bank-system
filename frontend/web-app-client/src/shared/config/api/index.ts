import { getEnvVar } from 'shared/config/env'

export const API_BASE_URL = getEnvVar('VITE_API_URL')
export const API_AUTH = '/auth'
