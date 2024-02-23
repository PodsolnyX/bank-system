import { VerboseCreditTable, OperationType, Credit } from 'entities'
import { Link } from 'react-router-dom'
import { Center, PageHeader, Property, getCreditRepayLink } from 'shared'

export const CreditPage = () => {
  const credit: Credit = {
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
      rate: 15,
    },
  }
  return (
    <Center>
      <PageHeader text='Информация о кредите' />

      <Property
        name='Кредит'
        value={`${credit.number}, тариф ${credit.tariff.name}, ${credit.tariff.rate}%`}
      />
      <Property name='Срок' value={`${credit.dateStart} по ${credit.dateEnd}`} />
      <Property
        name='Долг, сумма, пеня'
        value={`${credit.currentAmount}, ${credit.fullAmount}, ${credit.fine} руб`}
      />
      <Property
        name='Оплачен'
        value={
          credit.needToPay ? (
            <Link to={getCreditRepayLink(credit.id)} className='text-red-500'>
              Нужна оплата
            </Link>
          ) : (
            <span className='text-lime-500'>Да</span>
          )
        }
      />

      <VerboseCreditTable
        operations={[
          {
            amount: 400,
            date: '2006.11.08',
            type: OperationType.REPAYMENT,
            id: '15',
            credit: { id: '1', number: '1' },
            account: { id: '1123', number: '1234-1234-1234-1234' },
          },
          {
            amount: 600,
            date: '2006.11.09',
            type: OperationType.REPAYMENT,
            id: '125',
            credit: { id: '1', number: '1' },
            account: { id: '1123', number: '1234-1234-1234-1234' },
          },
        ]}
      />
    </Center>
  )
}
