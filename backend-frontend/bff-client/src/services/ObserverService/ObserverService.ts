import { REQUEST_TIME_START_HEADER, RequestLog } from 'common'
import { Request } from 'express'
import { ObserverRepo } from 'repos/ObserverRepo'

class ObserverService {
  private _ObserverRepo: ObserverRepo

  constructor(ObserverRepo: ObserverRepo) {
    this._ObserverRepo = ObserverRepo
  }

  async Collect(req: Request<any, any, any, any>, status: number, body?: any) {
    const start = req.headers[REQUEST_TIME_START_HEADER] as string
    const i = req.url.indexOf('?')
    const headers: Record<string, string> = {}
    for (const key in req.headers) {
      const value = req.headers[key]
      if (typeof value === 'string' && key !== 'authorization') {
        headers[key] = value
      }
    }
    let JSONBody = null
    try {
      JSONBody = JSON.stringify(body)
    } catch {}

    const data: RequestLog = {
      body: req.body,
      durationInMilliseconds: Date.now() - parseInt(start),
      finishedAt: new Date().toISOString(),
      headers,
      method: req.method,
      microserviceName: 'bff-client',
      path: req.path,
      queryString: i === -1 ? null : req.url.substr(i + 1),
      remoteIpAddress: req.ip || null,
      responseBody: JSONBody,
      responseHeaders: null,
      source: 'HTTP',
      startedAt: new Date(parseInt(start)).toISOString(),
      statusCode: status,
      tags: [],
      userAgent: req.headers['user-agent'] || null,
    }
    return await this._ObserverRepo.Collect(data)
  }
}

export default ObserverService
