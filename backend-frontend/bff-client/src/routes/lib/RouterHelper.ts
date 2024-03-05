import { AxiosError } from 'axios'
import { Router, RequestHandler } from 'express'

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'all'

type ProtoReqHandler = (
  ...args: Parameters<RequestHandler<any, any, any, any>>
) => Promise<any>

type Route = {
  method: Method
  path: string
  handlers: ProtoReqHandler[]
}

class RouterHelper {
  use(router: Router, controller: any, routes: Route[]) {
    const paths = new Set(routes.map((route) => route.path))

    for (const route of routes) {
      const bindedHandlers = [...route.handlers].map((handler) => {
        return async (...args: Parameters<ProtoReqHandler>) => {
          try {
            return await handler.call(controller, ...args)
          } catch (err) {
            if (err instanceof AxiosError && err.response) {
              args[1].status(err.response.status).send(err.response.data)
            } else {
              args[1].sendStatus(500)
            }
          }
        }
      })

      router[route.method](route.path, bindedHandlers)
    }

    for (const path of paths) {
      router.all(path, (_req, res) => res.sendStatus(405))
    }
  }
}

export default new RouterHelper()
