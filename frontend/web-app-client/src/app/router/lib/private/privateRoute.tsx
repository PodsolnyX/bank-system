import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { AppRoutes } from 'shared/const'
import { useAppSelector } from 'shared/store'

export const PrivateRoute = ({ elem }: { elem: ReactNode }) => {
  const isAuth = useAppSelector((state) => state.authReducer.mail)

  return isAuth ? elem : <Navigate to={AppRoutes.LOGIN} />
}
