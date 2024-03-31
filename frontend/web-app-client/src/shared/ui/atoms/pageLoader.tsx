import { Spin } from 'antd'
import { Center } from 'shared/ui'

export const PageLoader = () => {
  return (
    <Center className='mt-[100px]'>
      <Spin size={'large'} className='w-[200px]' />
    </Center>
  )
}
