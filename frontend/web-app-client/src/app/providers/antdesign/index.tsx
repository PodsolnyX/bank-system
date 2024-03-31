import { ConfigProvider } from 'antd'
import ruRU from 'antd/locale/ru_RU'
import { PropsWithChildren } from 'react'

export const AntdProvider = (props: PropsWithChildren) => (
  <ConfigProvider locale={ruRU}>{props.children}</ConfigProvider>
)
