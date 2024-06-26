export type RequestLog = {
  microserviceName: string | null
  tags: string[] | null
  source: string | null
  traceId: string
  idempotencyKey: string | null
  startedAt: string
  finishedAt: string
  durationInMilliseconds: number
  method: string | null
  path: string | null
  queryString: string | null
  headers: Record<string, string> | null
  remoteIpAddress: string | null
  userAgent: string | null
  statusCode: number
  responseHeaders: Record<string, string> | null
}

export const REQUEST_ID_HEADER = 'x-bffc-id'
export const REQUEST_TIME_START_HEADER = 'x-bffc-timestart'