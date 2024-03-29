import { Button, Skeleton, Tabs } from 'antd'
import { Link } from 'react-router-dom'
import { PlusCircleOutlined, FieldTimeOutlined } from '@ant-design/icons'
import { Center, ErrorMsg, PageHeader } from 'shared/ui'
import { AppRoutes } from 'shared/const'
import { useExecuteJobMutation, useGetLoansQuery, useGetPaymentsQuery } from 'shared/api'
import { GeneralLoanTable, PaymentsTable } from 'entities'

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

  return (
    <Center>
      <PageHeader text='Список кредитов' />
      {loans.isFetching || payments.isFetching ? (
        <div>
          <Skeleton.Button className='mb-2 mx-1' />
          <Skeleton.Button className='mb-2 mx-1' />
        </div>
      ) : (
        <div className='text-center'>
          <Link to={AppRoutes.LOAN_NEW}>
            <Button className='mb-2 mx-1' icon={<PlusCircleOutlined />}>
              Новый кредит
            </Button>
          </Link>
          <Button className='mb-2 mx-1' icon={<FieldTimeOutlined />} onClick={timeJump}>
            Прыжок времени
          </Button>
        </div>
      )}
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
