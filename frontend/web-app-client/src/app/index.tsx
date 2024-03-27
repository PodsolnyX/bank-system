import { useAuth } from 'oidc-react'

import { BanPage } from 'pages/ban'
import { ErrorPage } from 'pages/error'
import { useTheme } from 'features/preferences'
import { useGetHiddenAccountsQuery } from 'entities/preferences'
import { useGetAccessInfoQuery } from 'entities/user'
import { Spinner } from 'shared/ui'

import { StoreProvider, Toaster, AppAuthProvider, AntdProvider } from './providers'
import { ApplicationRouter } from './router'
import './styles/index.scss'

function App() {
  useTheme()
  const { isLoading: isAuthLoading, userData } = useAuth()

  const hiddenAccs = useGetHiddenAccountsQuery(undefined, { skip: !userData })

  const accessQuery = useGetAccessInfoQuery(
    { userid: userData?.profile.sub || '' },
    { skip: !userData?.profile.sub }
  )

  const isLoading = isAuthLoading || hiddenAccs.isFetching || accessQuery.isFetching
  const isError = hiddenAccs.isError || accessQuery.isError
  const isBanned = accessQuery.data?.bannedAt !== null

  return isLoading ? (
    <Spinner />
  ) : isError ? (
    <ErrorPage />
  ) : isBanned ? (
    <BanPage />
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
