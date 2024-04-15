export type RequestLog = {
  microserviceName: string | null
  tags: string[] | null
  source: string | null
  startedAt: string
  finishedAt: string
  durationInMilliseconds: number
  method: string | null
  path: string | null
  queryString: string | null
  body: string | null
  headers: Record<string, string> | null
  remoteIpAddress: string | null
  userAgent: string | null
  statusCode: number
  responseBody: string | null
  responseHeaders: Record<string, string> | null
}
