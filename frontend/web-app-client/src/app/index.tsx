import ruRU from 'antd/locale/ru_RU'
import { ConfigProvider } from 'antd'

import { StoreProvider, useAppSelector } from 'shared/store'
import { ApplicationRouter } from './router'
import { Toaster } from './toast'
import { useGetProfileMutation } from 'shared/api'
import { Spinner } from 'shared/ui'
import { BanPage } from 'pages/ban'
import { useEffect } from 'react'

function App() {
  const mail = useAppSelector((store) => store.authReducer.mail)
  const [trigger, { isLoading, data, isUninitialized }] = useGetProfileMutation()

  useEffect(() => {
    if (mail) {
      trigger(mail)
    }
  }, [mail])

  if (isLoading || (isUninitialized && mail)) {
    return <Spinner />
  }

  if (data?.banedAt) {
    return <BanPage banedAt={data?.banedAt} />
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
