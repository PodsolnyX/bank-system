import { Router, RequestHandler } from "express";

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'all'

type Route = {
    method: Method,
    path: string,
    handlers: RequestHandler[] 
}

class RouterHelper {
    use(router: Router, controller: any, routes: Route[]) {
        const paths = new Set(routes.map(route => route.path))

        for (const route of routes) {
            const bindedHandlers = [...route.handlers].map(handler => {
                return handler.bind(controller)
            })

            router[route.method](route.path, bindedHandlers)
        }
        
        for (const path of paths) {
            router.all(path, (_req, res) => res.sendStatus(405))
        }
    }
}

export default new RouterHelper()