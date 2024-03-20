import { useAuth } from 'oidc-react'

import { Spinner } from 'shared/ui'
import { useGetHiddenAccountsQuery } from 'entities/preferences'
import { useTheme } from 'features/preferences'
import { ErrorPage } from 'pages/error'
import { BanPage } from 'pages/ban'

import { ApplicationRouter } from './router'
import { StoreProvider, Toaster, AppAuthProvider, AntdProvider } from './providers'

import './styles/index.scss'

function App() {
  useTheme()
  const { isLoading: isAuthLoading, userData } = useAuth()

  const hiddenAccs = useGetHiddenAccountsQuery(undefined, { skip: !userData })

  const isLoading = isAuthLoading || hiddenAccs.isFetching
  const isError = hiddenAccs.isError

  const isBanned = false
  return isLoading ? (
    <Spinner />
  ) : isError ? (
    <ErrorPage />
  ) : isBanned ? (
    <BanPage bannedAt={'dsa'} />
  ) : (
    <>
      <Toaster />
      <ApplicationRouter />
    </>
  )
}

const WrappedApp = () => {
  return (
    <StoreProvider>
      <AppAuthProvider>
        <AntdProvider>
          <App />
        </AntdProvider>
      </AppAuthProvider>
    </StoreProvider>
  )
}

export default WrappedApp
