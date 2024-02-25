import ruRU from 'antd/locale/ru_RU'
import { ConfigProvider } from 'antd'

import { StoreProvider, useAppSelector } from 'shared/store'
import { ApplicationRouter } from './router'
import { Toaster } from './toast'
import { useGetProfileQuery } from 'shared/api'
import { Spinner } from 'shared/ui'
import { BanPage } from 'pages/ban'

function App() {
  const mail = useAppSelector((store) => store.authReducer.mail)
  const profile = useGetProfileQuery(mail, { skip: !mail })

  if (profile.isFetching) {
    return <Spinner />
  }

  if (profile.data?.banedAt) {
    return <BanPage banedAt={profile.data?.banedAt} />
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
