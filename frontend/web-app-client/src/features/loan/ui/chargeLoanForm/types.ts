import { Account } from 'entities/account'
import { Loan } from 'entities/loan'
import { FormProps } from 'shared/ui'
import { ChargeLoanReq } from '../../api'

export type ChargeLoanFormProps = {
  onFinish: (values: ChargeLoanFormValues) => Promise<void>
  loan: Pick<Loan, 'id' | 'currencyType' | 'debt'>
  accounts: Pick<Account, 'id' | 'currencyType' | 'closedAt' | 'amount'>[]
} & FormProps

export type ChargeLoanFormValues = ChargeLoanReq
