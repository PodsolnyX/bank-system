import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { PlusCircleOutlined } from '@ant-design/icons'
import { AppRoutes, Center } from 'shared'
import { Credit, GeneralCreditTable } from 'entities'

export const CreditsListPage = () => {
  return (
    <Center>
      <h1 className='mb-1'>Меню кредитов</h1>
      <Link to={AppRoutes.CREDIT_NEW}>
        <Button className='mb-2' icon={<PlusCircleOutlined />}>
          Новый кредит
        </Button>
      </Link>
      <GeneralCreditTable credits={credits} />
    </Center>
  )
}

const credits: Credit[] = [
  {
    currentAmount: 0,
    dateEnd: '2025.11.15',
    dateStart: '2021.10.11',
    fullAmount: 21231233,
    id: '123123',
    needToPay: true,
    number: '231-12',
    tariff: {
      id: '213',
      name: 'тариф 1',
    },
    fine: 102,
  },
  {
    currentAmount: 23122,
    dateEnd: '2024.11.15',
    dateStart: '2020.10.11',
    fullAmount: 2123,
    id: '1231234',
    needToPay: false,
    number: '123-112',
    tariff: {
      id: '2213',
      name: 'тариф 2',
    },
    fine: 211,
  },
]
