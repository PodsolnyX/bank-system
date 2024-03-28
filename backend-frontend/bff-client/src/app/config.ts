export const CORS_CONFIG = { origin: 'http://localhost:5173', credentials: true }
export const PORT = process.env.PORT || 3000
export const WS_PORT = process.env.WS_PORT ? Number(process.env.WS_PORT) : 8080
export const WS_PATH = '/history'
