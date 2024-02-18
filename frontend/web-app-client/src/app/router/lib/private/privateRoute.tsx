import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { AppRoutes } from 'shared'

export const PrivateRoute = ({ elem }: { elem: ReactNode }) => {
  const isAuth = true

  return isAuth ? elem : <Navigate to={AppRoutes.LOGIN} />
}
