import ruRU from 'antd/locale/ru_RU'
import { ConfigProvider, Result } from 'antd'

import { StoreProvider, useAppSelector } from 'shared/store'
import { ApplicationRouter } from './router'
import { Toaster } from './toast'
import { useLazyGetStatusQuery } from 'shared/api'
import { Spinner } from 'shared/ui'
import { BanPage } from 'pages/ban'
import { useEffect } from 'react'

function App() {
  const mail = useAppSelector((store) => store.authReducer.mail)
  const [trigger, { isLoading, isError, data, isUninitialized }] = useLazyGetStatusQuery(
    {}
  )

  useEffect(() => {
    if (mail) {
      trigger(mail, true)
    }
  }, [mail, trigger])

  if (isLoading || (isUninitialized && mail)) {
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

  if (data?.bannedAt) {
    return <BanPage bannedAt={data?.bannedAt} />
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
