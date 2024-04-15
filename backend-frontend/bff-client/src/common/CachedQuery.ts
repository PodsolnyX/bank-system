export type CachedQuery = {
  key: string
  status: number
  data: string | null | undefined
}

export type PreCachedQuery = {
  key: string
  status?: number
  data: unknown
}

export type CachedQueryDbRecord = CachedQuery & {
  timestamp: number
}

export type CachedQueryInfo = Omit<CachedQuery, 'key'>

export type CachedQueryInfoResp = CachedQueryInfo | null | undefined
