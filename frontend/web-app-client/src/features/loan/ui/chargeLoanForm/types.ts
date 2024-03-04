import { ChargeLoanReq } from 'shared/api'
import { Account, Loan } from 'shared/entities'
import { FormProps } from 'shared/ui'

export type ChargeLoanFormProps = {
  onFinish: (values: ChargeLoanFormValues) => void
  loan: Pick<Loan, 'id' | 'currencyType' | 'debt'>
  accounts: Pick<Account, 'id' | 'currencyType' | 'closedAt' | 'amount'>[]
} & FormProps

export type ChargeLoanFormValues = ChargeLoanReq
