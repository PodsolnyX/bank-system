import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { Center } from 'shared/ui'
import { AppRoutes } from 'shared/config'

import { RatingWidget } from 'entities/loan'
import { getRatingText } from '../lib'

export const RatingPage = () => {
  const max = 2000
  const current = 300
  const text = getRatingText(current)

  return (
    <Center>
      <h1>Рейтинг</h1>
      <h3 className='my-3'>{text}</h3>
      <RatingWidget max={max} current={current} />
      <Link to={AppRoutes.LOANS} className='my-1'>
        <Button>В меню кредитов</Button>
      </Link>
    </Center>
  )
}
