import ruRU from 'antd/locale/ru_RU'
import { ConfigProvider } from 'antd'
import { PropsWithChildren } from 'react'

export const AntdProvider = (props: PropsWithChildren) => (
  <ConfigProvider locale={ruRU}>{props.children}</ConfigProvider>
)
