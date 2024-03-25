import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { RatingWidget, useGetRatingQuery } from 'entities/loan'
import { AppRoutes } from 'shared/config'
import { Center, PageLoader } from 'shared/ui'

import { getRatingText } from '../lib'

export const RatingPage = () => {
  const max = 1000
  const { isFetching, data: current } = useGetRatingQuery()

  if (isFetching) {
    return <PageLoader />
  }

  const text = getRatingText(max, current?.rating)

  return (
    <Center>
      <h1>Рейтинг</h1>
      <h3 className='my-3'>{text}</h3>
      <RatingWidget max={max} current={current?.rating} />
      <Link to={AppRoutes.LOANS} className='my-1'>
        <Button>В меню кредитов</Button>
      </Link>
    </Center>
  )
}
