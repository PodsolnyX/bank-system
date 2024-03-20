import { useAuth } from 'oidc-react'
import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { AppRoutes } from 'shared/config'
import { Spinner } from 'shared/ui'

export const PublicRoute = ({ elem }: { elem: ReactNode }) => {
  const { userData } = useAuth()

  if (userData === null) return <Spinner />
  return userData ? <Navigate to={AppRoutes.MAIN} /> : elem
}
