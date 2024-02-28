import { Button, Skeleton } from 'antd'
import { Link } from 'react-router-dom'
import { PlusCircleOutlined } from '@ant-design/icons'
import { Center, ErrorMsg, PageHeader } from 'shared/ui'
import { AppRoutes } from 'shared/const'
import { useGetLoansQuery } from 'shared/api'
import { GeneralLoanTable } from 'entities'

export const LoansListPage = () => {
  const loans = useGetLoansQuery({ limit: 10000 })

  if (loans.isError) {
    return (
      <ErrorMsg
        text='Произошла ошибка при загрузке кредитов'
        link={AppRoutes.MAIN}
        linkText='В главное меню'
      />
    )
  }

  return (
    <Center>
      <PageHeader text='Список кредитов' />
      {loans.isFetching ? (
        <Skeleton.Button className='mb-2' />
      ) : (
        <Link to={AppRoutes.LOAN_NEW}>
          <Button className='mb-2' icon={<PlusCircleOutlined />}>
            Новый кредит
          </Button>
        </Link>
      )}
      <GeneralLoanTable isLoading={loans.isFetching} loans={loans.data!} />
    </Center>
  )
}
