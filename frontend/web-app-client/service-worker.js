// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
let socket = undefined

self.addEventListener('push', function (event) {
  const options = {
    body: event.data.text(),
  }

  event.waitUntil(self.registration.showNotification('Новая операция', options))
})

const channel4Broadcast = new BroadcastChannel('channel4')
channel4Broadcast.onmessage = (event) => {
  socket = new WebSocket(`ws://localhost:8080/history?token=${event.data.key}`)
  socket.onmessage = (e) => {
    self.registration.showNotification('Новая операция', {
      body: extractText(e.data),
      icon: './favicon.ico',
    })
  }
}

function extractText(string) {
  try {
    const obj = JSON.parse(string)
    const reason = obj.operationReason
    const type = obj.operationType
    let text = 'Неизвестная операция'
    if (reason === 0) {
      if (type === 0) {
        text = 'Пополнение'
      } else if (type === 1) {
        text = 'Снятие'
      }
    } else if (reason === 1) {
      if (type === 0) {
        text = 'Погашение'
      } else if (type === 1) {
        text = 'Кредит'
      }
    }
    let curr = obj.currencyType
    let currText = curr === 0 ? 'RUB' : curr === 1 ? 'USD' : curr === 2 ? 'EUR' : ''
    let mainText = `${obj.accountId}. ${text}: ${obj.amount / 100}${currText}`
    return obj.loanId ? `${mainText}. Кредит: ${obj.loanId}` : mainText
  } catch {
    return 'Зайдите в приложение'
  }
}
