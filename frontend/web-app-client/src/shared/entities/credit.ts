import { Tariff } from 'shared'

export type Credit = {
  id: string
  dateStart: string
  dateEnd: string
  number: string
  fullAmount: number
  currentAmount: number
  needToPay: boolean
  tariff: Pick<Tariff, 'id' | 'name' | 'rate'>
  fine: number
}
