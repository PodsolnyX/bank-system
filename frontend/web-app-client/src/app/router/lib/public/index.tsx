import { RouteObject } from 'react-router-dom'
import { PublicRoute } from './publicRoute'

export const publicWrapper = (routes: RouteObject[]) =>
  routes.map((route) => ({
    ...route,
    element: <PublicRoute elem={route.element} />,
  }))
