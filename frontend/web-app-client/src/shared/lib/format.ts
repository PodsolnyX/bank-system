const formatter = new Intl.NumberFormat('ru-RU', {
  minimumFractionDigits: 2,
}).format

export const format = (value: number) => formatter(value / 100)

interface IConvertable {
  [key: string | number | symbol]: any
  amount: number
}

export const convert = <T extends IConvertable>(obj: T) => {
  if (Object.hasOwn(obj, 'amount')) {
    return {
      ...obj,
      amount: Math.trunc(obj['amount'] * 100),
    }
  }
  return obj
}
