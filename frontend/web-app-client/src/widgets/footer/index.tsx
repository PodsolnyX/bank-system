import { Layout } from 'antd'

export const Footer = () => {
  const text = `© ${new Date().getFullYear()} Зеленый банк`

  return (
    <Layout.Footer className='mt-auto flex flex-row items-center justify-center p-3 bg-navbar shadow-[0px_-2px_3px_rgba(0,0,0,0.1)] relative'>
      {text}
    </Layout.Footer>
  )
}
