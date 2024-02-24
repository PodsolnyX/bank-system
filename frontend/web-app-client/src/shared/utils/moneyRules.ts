import { Rule } from 'antd/es/form'

const MIN = 0
const MAX = 10000000
const requiredMsg = 'Пожалуйста, введите сумму!'
const minMsg = `Сумма должна быть больше ${MIN}!`
const maxMsg = `Сумма должна быть не больше ${MAX}!`
export const moneyRules: Rule[] = [
  { required: true, message: requiredMsg },
  {
    validator: (_rule, v) =>
      Number(v) > MIN || v === undefined ? Promise.resolve() : Promise.reject(minMsg),
  },
  {
    validator: (_rule, v) =>
      Number(v) <= MAX || v === undefined ? Promise.resolve() : Promise.reject(maxMsg),
  },
]
