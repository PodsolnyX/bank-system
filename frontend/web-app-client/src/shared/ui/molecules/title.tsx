import { Flex } from 'antd'
import { useNavigate } from 'react-router-dom'
import cs from 'classnames'

import { Logo } from 'shared/ui'
import { AppRoutes } from 'shared/config'

export interface TitleProps {
  [x: string]: any
  className?: string
}

export const Title = (props: TitleProps) => {
  const { className, ...rest } = props
  const navigate = useNavigate()

  const onTitleClick = () => {
    navigate(AppRoutes.MAIN)
  }

  return (
    <div
      className={cs('flex select-none cursor-pointer hover:shimmer', className)}
      onClick={onTitleClick}
      {...rest}
    >
      <Logo />
      <Flex vertical>
        <span className='sm:text-xl md:text-2xl leading-none'>
          <span className='text-green-400'>Зеленый</span>
          <span className='text-common'>&nbsp;Банк</span>
        </span>
        <span className='text-common text-sm leading-none'>Клиент</span>
      </Flex>
    </div>
  )
}
