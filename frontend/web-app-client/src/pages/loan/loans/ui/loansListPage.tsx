import {
  PlusCircleOutlined,
  FieldTimeOutlined,
  PieChartOutlined,
} from '@ant-design/icons'
import { Button, Tabs } from 'antd'
import { Link } from 'react-router-dom'
import { useExecuteJobMutation } from 'features/loan'
import { useGetLoansQuery, useGetPaymentsQuery } from 'entities/loan'
import { GeneralLoanTable, PaymentsTable } from 'entities/loan'
import { AppRoutes } from 'shared/config'
import { Center, ErrorMsg, PageHeader, PageLoader } from 'shared/ui'

export const LoansListPage = () => {
  const loans = useGetLoansQuery({ limit: 10000 })
  const payments = useGetPaymentsQuery({ onlyActual: false })
  const [trigger] = useExecuteJobMutation()

  if (loans.isError || payments.isError) {
    return (
      <ErrorMsg
        text='Произошла ошибка при загрузке кредитов'
        link={AppRoutes.MAIN}
        linkText='В главное меню'
      />
    )
  }

  const timeJump = async () => {
    await trigger()
    location.reload()
  }

  if (loans.isFetching || payments.isFetching) {
    return <PageLoader />
  }

  return (
    <Center>
      <PageHeader text='Список кредитов' />
      
        <div className='text-center'>
          <Link to={AppRoutes.LOAN_NEW}>
            <Button className='mb-2 mx-1' icon={<PlusCircleOutlined />}>
              Новый кредит
            </Button>
          </Link>
          <Button className='mb-2 mx-1' icon={<FieldTimeOutlined />} onClick={timeJump}>
            Прыжок времени
          </Button>
          <Link to={AppRoutes.RATING}>
            <Button className='mb-2 mx-1' icon={<PieChartOutlined />}>
              Рейтинг
            </Button>
          </Link>
        </div>
      <Tabs
        className='w-full md:w-2/3 flex justify-center align-center'
        centered
        defaultActiveKey='1'
        items={[
          {
            label: 'Основное',
            key: '1',
            children: (
              <GeneralLoanTable
                isLoading={loans.isFetching || payments.isFetching}
                loans={loans.data! || []}
                payments={payments.data! || []}
              />
            ),
          },
          {
            label: 'Отчет',
            key: '2',
            children: (
              <PaymentsTable
                full
                payments={payments.data!}
                isLoading={loans.isFetching || payments.isFetching}
              />
            ),
          },
        ]}
      />
    </Center>
  )
}
