import { useAuth } from 'oidc-react'
import { ReactNode } from 'react'
import { Spinner } from 'shared/ui'

export const PrivateRoute = ({ elem }: { elem: ReactNode }) => {
  const { userData } = useAuth()

  if (userData === null) return <Spinner />
  return elem
}
