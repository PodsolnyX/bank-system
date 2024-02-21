import { RouteObject } from 'react-router-dom'
import { AppRoutes } from 'shared'
import { LoginPage, RegisterPage } from 'pages'

import { publicWrapper } from 'app/router/lib'

const _publicRoutes: RouteObject[] = [
  {
    path: AppRoutes.LOGIN,
    element: <LoginPage />,
  },
  {
    path: AppRoutes.REGISTER,
    element: <RegisterPage />,
  },
]

export const publicRoutes = publicWrapper(_publicRoutes)
