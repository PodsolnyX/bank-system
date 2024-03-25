import { useAuth } from 'oidc-react'

import { BanPage } from 'pages/ban'
import { ErrorPage } from 'pages/error'
import { useTheme } from 'features/preferences'
import { useGetHiddenAccountsQuery } from 'entities/preferences'
import { Spinner } from 'shared/ui'

import { StoreProvider, Toaster, AppAuthProvider, AntdProvider } from './providers'
import { ApplicationRouter } from './router'

import './styles/index.scss'

function App() {
  useTheme()
  const { isLoading: isAuthLoading, userData } = useAuth()
  console.log(userData)

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
