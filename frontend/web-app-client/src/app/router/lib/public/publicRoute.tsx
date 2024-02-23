import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { AppRoutes } from 'shared/const'

export const PublicRoute = ({ elem }: { elem: ReactNode }) => {
  const isAuth = false

  return isAuth ? <Navigate to={AppRoutes.MAIN} /> : elem
}
