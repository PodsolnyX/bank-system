import { AuthProvider } from 'oidc-react'
import { PropsWithChildren } from 'react'

import { oidcConfig } from './config'

export const AppAuthProvider = (props: PropsWithChildren) => (
  <AuthProvider {...oidcConfig}>{props.children}</AuthProvider>
)
