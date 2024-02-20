import { StoreProvider } from 'shared/store'
import { ApplicationRouter } from './router'
import ruRU from 'antd/locale/ru_RU'
import { ConfigProvider } from 'antd'

function App() {
  return (
    <ConfigProvider locale={ruRU}>
      <StoreProvider>
        <ApplicationRouter />
      </StoreProvider>
    </ConfigProvider>
  )
}

export default App
