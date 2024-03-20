import { Button, Skeleton } from 'antd'
import { Link } from 'react-router-dom'
import { PlusCircleOutlined } from '@ant-design/icons'
import { Center, ErrorMsg, PageHeader } from 'shared/ui'
import { AppRoutes } from 'shared/config'
import { useGetAccountsQuery } from 'entities/account'
import { AccountsTable } from 'features/account'

export const AccountsPage = () => {
  const accounts = useGetAccountsQuery({ limit: 10000 })

  if (accounts.isError) {
    return (
      <ErrorMsg
        text='Произошла ошибка при загрузке счетов'
        link={AppRoutes.MAIN}
        linkText='В главное меню'
      />
    )
  }
  return (
    <Center>
      <PageHeader text='Список счетов' />
      {accounts.isFetching ? (
        <Skeleton.Button className='mb-2' />
      ) : (
        <Link to={AppRoutes.ACCOUNT_NEW}>
          <Button className='mb-2' icon={<PlusCircleOutlined />}>
            Новый счет
          </Button>
        </Link>
      )}

      <AccountsTable isLoading={accounts.isFetching} accounts={accounts.data!} />
    </Center>
  )
}
