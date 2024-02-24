import { Tariff } from 'shared/entities'

export type Loan = {
  id: string
  dateStart: string
  dateEnd: string
  number: string
  fullAmount: number
  currentAmount: number
  needToPay: boolean
  tariff: Pick<Tariff, 'id' | 'name' | 'interestRate'>
  fine: number
}
