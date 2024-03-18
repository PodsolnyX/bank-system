import { RouteObject } from 'react-router-dom'

import { publicWrapper } from 'app/router/lib'

const _publicRoutes: RouteObject[] = []

export const publicRoutes = publicWrapper(_publicRoutes)
