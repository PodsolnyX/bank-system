import { Layout } from 'antd'
import { Title, Menu } from 'shared/ui'
import { HeaderLinks } from '../config'
import { useMenuLinkMap } from '../lib'

export const Header = () => {
  const leftLinks = useMenuLinkMap(HeaderLinks.left)
  const rightLinks = useMenuLinkMap(HeaderLinks.right)

  return (
    <Layout.Header className='bg-gray-100 flex justify-center items-center sm:justify-start p-1 sm:p-2 p-4 shadow'>
      <Title className='ml-1 md:ml-3' />
      <Menu leftSide={leftLinks} rightSide={rightLinks} />
    </Layout.Header>
  )
}
