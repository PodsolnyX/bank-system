import { Link, useParams } from 'react-router-dom'
import { Button, Skeleton } from 'antd'
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons'

import { HistoryTable } from 'entities'
import { Center, ErrorMsg, PageHeader, Property } from 'shared/ui'
import { useGetHistoryQuery, useGetAccountQuery } from 'shared/api'
import {
  AppRoutes,
  getAccountCloseLink,
  getAccountDepositLink,
  getAccountWithdrawLink,
} from 'shared/const'
import { SortOrder } from 'shared/entities'
import { format } from 'shared/utils/format'

export const AccountPage = () => {
  const id = useParams()['id']!
  const histQuery = useGetHistoryQuery({
    accountIds: [id],
    orderBy: 'createdAt',
    sortOrder: SortOrder.DESC,
  })
  const accQuery = useGetAccountQuery({ id })

  const isLoading = !accQuery.isSuccess || !histQuery.isSuccess

  if (accQuery.isError || histQuery.isError) {
    return (
      <ErrorMsg
        link={AppRoutes.ACCOUNTS}
        linkText='Вернуться в меню счетов'
        text='Произошла ошибка при загрузке данных'
      />
    )
  }

  return (
    <Center>
      <PageHeader text='Страница счета' />
      {isLoading ? (
        <>
          <div className='flex flex-col md:flex-row w-1/3 justify-evenly text-center'>
            <Skeleton.Button className='mb-2 w-1/3' />
            <Skeleton.Button className='mb-2 w-1/3' />
            <Skeleton.Button className='mb-2 w-1/3' />
          </div>
        </>
      ) : (
        <>
          <div className='flex flex-col lg:flex-row w-1/3 justify-evenly text-center'>
            <Link to={getAccountDepositLink(id)}>
              <Button
                className='mb-2'
                icon={<PlusCircleOutlined />}
                disabled={!!accQuery.data!.closedAt}
              >
                Пополнить
              </Button>
            </Link>
            <Link to={getAccountWithdrawLink(id)}>
              <Button
                className='mb-2'
                icon={<MinusCircleOutlined />}
                disabled={!!accQuery.data!.closedAt || accQuery.data!.amount <= 0}
              >
                Снять
              </Button>
            </Link>
            <Link to={getAccountCloseLink(id)}>
              <Button
                danger
                className='mb-2'
                icon={<CloseCircleOutlined />}
                disabled={!!accQuery.data!.closedAt || accQuery.data!.amount > 0}
              >
                Закрыть
              </Button>
            </Link>
          </div>
          <Property name='Номер счета' value={accQuery.data!.id} />
          <Property
            name='Текущая сумма'
            value={`${format(accQuery.data!.amount)} ${accQuery.data!.currencyType}`}
          />
          <Property
            name='Статус счета'
            value={
              accQuery.data!.closedAt
                ? `Закрыт ${new Date(accQuery.data!.closedAt).toLocaleString()}`
                : 'Открыт'
            }
          />
        </>
      )}
      <HistoryTable isLoading={isLoading} history={histQuery.data!} />
    </Center>
  )
}
