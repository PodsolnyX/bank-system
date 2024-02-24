import { Link } from 'react-router-dom'

import { VerboseLoanTable } from 'entities'
import { Center, PageHeader, Property } from 'shared/ui'
import { OperationType, Loan } from 'shared/entities'
import { getLoanRepayLink } from 'shared/const'

export const LoanPage = () => {
  const loan: Loan = {
    id: '234',
    currentAmount: 21321,
    dateEnd: '211231',
    dateStart: '21312',
    fine: 213,
    fullAmount: 123,
    needToPay: true,
    number: '21312312',
    tariff: {
      id: '13',
      name: 'adssda',
      interestRate: 15,
    },
  }
  return (
    <Center>
      <PageHeader text='Информация о кредите' />

      <Property
        name='Кредит'
        value={`${loan.number}, тариф ${loan.tariff.name}, ${loan.tariff.interestRate}%`}
      />
      <Property name='Срок' value={`${loan.dateStart} по ${loan.dateEnd}`} />
      <Property
        name='Долг, сумма, пеня'
        value={`${loan.currentAmount}, ${loan.fullAmount}, ${loan.fine} руб`}
      />
      <Property
        name='Оплачен'
        value={
          loan.needToPay ? (
            <Link to={getLoanRepayLink(loan.id)} className='text-red-500'>
              Нужна оплата
            </Link>
          ) : (
            <span className='text-lime-500'>Да</span>
          )
        }
      />

      <VerboseLoanTable
        operations={[
          {
            amount: 400,
            date: '2006.11.08',
            type: OperationType.LOAN_CHARGE,
            id: '15',
            loadId: '1',
            accountId: '1234123412341234',
          },
          {
            amount: 600,
            date: '2006.11.09',
            type: OperationType.LOAN_CHARGE,
            id: '125',
            loadId: '21',
            accountId: '213',
          },
        ]}
      />
    </Center>
  )
}
