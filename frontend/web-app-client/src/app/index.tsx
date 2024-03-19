import { useAuth } from 'oidc-react'

import { StoreProvider } from 'shared/store'
import { Spinner } from 'shared/ui'
import { useGetStatusQuery, useGetHiddenAccountsQuery } from 'shared/api'
import { useTheme } from 'shared/theme'
import { ErrorPage, BanPage } from 'pages'

import { ApplicationRouter } from './router'
import { Toaster, AppAuthProvider, AntdProvider } from './providers'

function App() {
  useTheme()
  const { isLoading: isAuthLoading, userData } = useAuth()
  const status = useGetStatusQuery('string', { skip: !userData })
  const hiddenAccs = useGetHiddenAccountsQuery(undefined, { skip: !userData })

  const isLoading = isAuthLoading || hiddenAccs.isFetching || status.isFetching
  const isError = hiddenAccs.isError || status.isError

  return isLoading ? (
    <Spinner />
  ) : isError ? (
    <ErrorPage />
  ) : status.data?.bannedAt ? (
    <BanPage bannedAt={status.data?.bannedAt} />
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
