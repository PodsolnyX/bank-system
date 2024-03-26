import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  CloseCircleOutlined,
  DownOutlined,
  BankOutlined,
} from '@ant-design/icons'
import { Button, Dropdown, Space } from 'antd'
import { Link, useParams } from 'react-router-dom'

import { useGetAccountQuery } from 'entities/account'
import { HistoryTable } from 'entities/operation'
import { OperationStatus, useGetHistoryQuery } from 'entities/operation'
import { SortOrder } from 'shared/api'
import {
  AppRoutes,
  getAccountCloseLink,
  getAccountDepositLink,
  getAccountTransferAnotherLink,
  getAccountTransferSelfLink,
  getAccountWithdrawLink,
} from 'shared/config'
import { format } from 'shared/lib/format'
import { Center, ErrorMsg, PageHeader, PageLoader, Property } from 'shared/ui'

export const AccountPage = () => {
  const id = useParams()['id']!
  const histQuery = useGetHistoryQuery({
    accountIds: [id],
    orderBy: 'createdAt',
    sortOrder: SortOrder.DESC,
    OperationStatuses: [
      OperationStatus.FAILURE,
      OperationStatus.PROCESSING,
      OperationStatus.SUCCESS,
    ],
  })
  const accQuery = useGetAccountQuery({ id })

  const isLoading = accQuery.isFetching || histQuery.isFetching

  if (isLoading) {
    return <PageLoader />
  }

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

      <div className='flex flex-col lg:flex-row w-2/5 justify-evenly text-center'>
        <Dropdown
          disabled={!!accQuery.data!.closedAt}
          menu={{
            items: [
              {
                label: <Link to={getAccountTransferSelfLink(id)}>Себе</Link>,
                key: '1',
              },
              {
                label: <Link to={getAccountTransferAnotherLink(id)}>Другому</Link>,
                key: '2',
              },
            ],
          }}
        >
          <Button className='mb-2'>
            <Space>
              <BankOutlined />
              Перевод
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
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
      <HistoryTable isLoading={isLoading} history={histQuery.data!} />
    </Center>
  )
}
