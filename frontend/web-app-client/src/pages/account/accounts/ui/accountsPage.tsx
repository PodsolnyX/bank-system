import { PlusCircleOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { AccountsTable } from 'features/account'
import { useGetAccountsQuery } from 'entities/account'
import { AppRoutes } from 'shared/config'
import { Center, ErrorMsg, PageHeader, PageLoader } from 'shared/ui'

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

  if (accounts.isLoading) {
    return <PageLoader />
  }

  return (
    <Center>
      <PageHeader text='Список счетов' />
      <Link to={AppRoutes.ACCOUNT_NEW}>
        <Button className='mb-2' icon={<PlusCircleOutlined />}>
          Новый счет
        </Button>
      </Link>
      <AccountsTable isLoading={accounts.isFetching} accounts={accounts.data!} />
    </Center>
  )
}
