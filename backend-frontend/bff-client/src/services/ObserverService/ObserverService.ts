import { KEY_HEADER, REQUEST_ID_HEADER, REQUEST_TIME_START_HEADER, RequestLog } from 'common'
import { Request } from 'express'
import { ObserverRepo } from 'repos/ObserverRepo'

class ObserverService {
  private _ObserverRepo: ObserverRepo

  constructor(ObserverRepo: ObserverRepo) {
    this._ObserverRepo = ObserverRepo
  }

  async Collect(req: Request<any, any, any, any>, status: number) {
    const start = req.headers[REQUEST_TIME_START_HEADER] as string
    const traceId = req.headers[REQUEST_ID_HEADER] as string
    const idempotencyKey = req.headers[KEY_HEADER] as (string | undefined)
    const i = req.url.indexOf('?')
    const headers: Record<string, string> = {}
    for (const key in req.headers) {
      const value = req.headers[key]
      if (typeof value === 'string' && key !== 'authorization') {
        headers[key] = value
      }
    }
    const time = Date.now()
    const data: RequestLog = {
      durationInMilliseconds: time - parseInt(start),
      finishedAt: new Date(time).toISOString(),
      headers,
      method: req.method,
      microserviceName: 'bff-client',
      path: req.originalUrl,
      queryString: i === -1 ? null : req.url.substr(i + 1),
      remoteIpAddress: req.ip || null,
      responseHeaders: null,
      source: 'HTTP',
      startedAt: new Date(parseInt(start)).toISOString(),
      statusCode: status,
      tags: [],
      userAgent: req.headers['user-agent'] || null,
      idempotencyKey: idempotencyKey || null,
      traceId: traceId || 'not_defined'
    }
    return await this._ObserverRepo.Collect(data)
  }
}

export default ObserverService
