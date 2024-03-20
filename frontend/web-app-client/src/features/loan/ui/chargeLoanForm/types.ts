import { ChargeLoanReq } from '../../api'
import { Account } from 'entities/account'
import { Loan } from 'entities/loan'
import { FormProps } from 'shared/ui'

export type ChargeLoanFormProps = {
  onFinish: (values: ChargeLoanFormValues) => void
  loan: Pick<Loan, 'id' | 'currencyType' | 'debt'>
  accounts: Pick<Account, 'id' | 'currencyType' | 'closedAt' | 'amount'>[]
} & FormProps

export type ChargeLoanFormValues = ChargeLoanReq
