import ruRU from 'antd/locale/ru_RU'
import { ConfigProvider } from 'antd'

import { StoreProvider } from 'shared/store'
import { ApplicationRouter } from './router'
import { Toaster } from './toast'

function App() {
  return (
    <ConfigProvider locale={ruRU}>
      <StoreProvider>
          <Toaster />
          <ApplicationRouter />
      </StoreProvider>
    </ConfigProvider>
  )
}

export default App
