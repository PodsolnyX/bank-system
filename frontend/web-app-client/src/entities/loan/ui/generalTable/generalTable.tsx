import { Table, Skeleton, Empty } from 'antd'
import { Loan, Payment } from '../../model'
import { generalLoanTableColumns } from './generalTableColumns'

export interface GeneralLoanTableProps {
  loans: Loan[]
  payments: Payment[]
  isLoading: boolean
}

export type LoanInfo = {
  loan: Loan
  payment?: Payment | null
}

export const GeneralLoanTable = (props: GeneralLoanTableProps) => {
  const { loans, payments, isLoading } = props

  const LoansInfo: LoanInfo[] = isLoading
    ? []
    : loans.map((loan) => ({ loan, payment: null }))

  for (const payment of payments) {
    if (isLoading || !payment.isActual) {
      continue
    }

    const loanId = payment.loan.id

    const infoRecord = LoansInfo.find((info) => info.loan.id === loanId)

    if (infoRecord) {
      infoRecord.payment = payment
    }
  }

  return (
    <Table
      rowKey={({ loan }) => loan.id}
      bordered
      className='w-full border-[1px] border-border border-solid rounded-lg text-sm'
      columns={generalLoanTableColumns}
      dataSource={LoansInfo}
      pagination={{ pageSize: 7, showSizeChanger: false }}
      locale={{
        emptyText: isLoading ? <Skeleton active={true} /> : <Empty />,
      }}
    />
  )
}
