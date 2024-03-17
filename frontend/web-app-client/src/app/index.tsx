import ruRU from 'antd/locale/ru_RU'
import { ConfigProvider, Result } from 'antd'

import { StoreProvider, useAppSelector } from 'shared/store'
import { ApplicationRouter } from './router'
import { Toaster } from './toast'
import { useLazyGetStatusQuery } from 'shared/api'
import { Spinner } from 'shared/ui'
import { BanPage } from 'pages/ban'
import { useEffect } from 'react'
import { useTheme } from 'app/styles/lib'
import { useGetHiddenAccountsQuery } from 'shared/api/preferences'

function App() {
  useTheme()
  const mail = useAppSelector((store) => store.authReducer.mail)

  const [trigger, status] = useLazyGetStatusQuery()
  const hiddenAccounts = useGetHiddenAccountsQuery(undefined, {
    skip: !mail,
  })

  const isLoading = hiddenAccounts.isFetching || status.isFetching
  const isError = hiddenAccounts.isError || status.isError

  useEffect(() => {
    if (mail) {
      trigger(mail, true)
    }
  }, [mail, trigger])

  if (isLoading || (status.isUninitialized && mail)) {
    return <Spinner />
  }

  if (isError) {
    return (
      <Result
        status='error'
        title='Что-то пошло не так'
        subTitle='Произошла непредвиденная ошибка'
      />
    )
  }

  if (status.data?.bannedAt) {
    return <BanPage bannedAt={status.data?.bannedAt} />
  }

  return (
    <ConfigProvider locale={ruRU}>
      <Toaster />
      <ApplicationRouter />
    </ConfigProvider>
  )
}

const WrappedApp = () => {
  return (
    <StoreProvider>
      <App />
    </StoreProvider>
  )
}

export default WrappedApp
