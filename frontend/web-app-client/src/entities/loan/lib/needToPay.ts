export const needToPay = (date: string | undefined) => {
  return !date || Date.now() - new Date(date).getMilliseconds() > 24 * 60 * 60 * 1000
}
