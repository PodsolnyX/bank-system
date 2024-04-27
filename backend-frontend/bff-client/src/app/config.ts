export const CORS_CONFIG = { origin: 'http://localhost:5173', credentials: true }
export const PORT = process.env.PORT || 3000

export const WS_PORT = process.env.WS_PORT ? Number(process.env.WS_PORT) : 8080
export const WS_PATH = '/history'

export const KEY_HEADER = 'x-key'

export const MONGO_URL =
  process.env.MONGO_URL || 'mongodb://root:password@109.107.189.133:27017'

  export const BACKEND_URL = process.env.BACKEND_URL || 'http://109.107.189.133'
