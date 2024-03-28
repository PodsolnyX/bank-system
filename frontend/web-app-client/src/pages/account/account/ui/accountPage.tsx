import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  CloseCircleOutlined,
  DownOutlined,
  BankOutlined,
  DollarCircleOutlined,
} from '@ant-design/icons'
import { Button, Dropdown, Space } from 'antd'
import { Link, useParams } from 'react-router-dom'

import { useMakePriorityMutation } from 'features/account'
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
import { toastError, toastSuccess } from 'shared/lib'
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
  const [makePriority] = useMakePriorityMutation()

  const priorityBtnClick = async () => {
    try {
      await makePriority({ accountId: id })
      toastSuccess('Успешно')
    } catch (err) {
      toastError('Произошла ошибка')
    }
  }

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
      <PageHeader text={accQuery.data?.isPriority ? 'Страница счета (приор.)' : 'Страница счета'} />
      <div className='flex flex-col lg:flex-row justify-evenly mb-2 text-center'>
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
          <Button className='m-2'>
            <Space>
              <BankOutlined />
              Перевод
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
        <Button
          className='m-2'
          icon={<DollarCircleOutlined />}
          onClick={priorityBtnClick}
          disabled={!!accQuery.data?.isPriority || !!accQuery.data?.closedAt}
        >
          Приоритет
        </Button>
        <Link to={getAccountDepositLink(id)}>
          <Button
            className='m-2'
            icon={<PlusCircleOutlined />}
            disabled={!!accQuery.data!.closedAt}
          >
            Пополнить
          </Button>
        </Link>
        <Link to={getAccountWithdrawLink(id)}>
          <Button
            className='m-2'
            icon={<MinusCircleOutlined />}
            disabled={!!accQuery.data!.closedAt || accQuery.data!.amount <= 0}
          >
            Снять
          </Button>
        </Link>
        <Link to={getAccountCloseLink(id)}>
          <Button
            danger
            className='m-2'
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
