import { Tariff } from 'entities/tariff'

export type Credit = {
  id: string
  dateStart: string
  dateEnd: string
  number: string
  fullAmount: number
  currentAmount: number
  needToPay: boolean
  tariff: Pick<Tariff, 'id' | 'name'>
  fine: number
}
