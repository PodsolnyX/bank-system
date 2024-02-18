import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { AppRoutes } from 'shared'

export const PublicRoute = ({ elem }: { elem: ReactNode }) => {
  const isAuth = true

  return isAuth ? <Navigate to={AppRoutes.MAIN} /> : elem
}
