import { RouteObject } from 'react-router-dom'
import { PrivateRoute } from './privateRoute'

export const privateWrapper = (routes: RouteObject[]) =>
  routes.map((route) => ({
    ...route,
    element: <PrivateRoute elem={route.element} />,
  }))
