import { RouteObject } from 'react-router-dom'
import { AppRoutes } from 'shared/const'
import { OldLoginPage, OldRegisterPage } from 'pages'

import { publicWrapper } from 'app/router/lib'

const _publicRoutes: RouteObject[] = [
  {
    path: AppRoutes.LOGIN,
    element: <OldLoginPage />,
  },
  {
    path: AppRoutes.REGISTER,
    element: <OldRegisterPage />,
  },
]

export const publicRoutes = publicWrapper(_publicRoutes)
