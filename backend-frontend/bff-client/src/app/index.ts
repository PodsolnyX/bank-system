import express, { Application } from 'express'
import { WebSocketServer } from 'ws'

import { pipeline } from './pipeline'
import { PORT, WS_PATH, WS_PORT } from './config'

import { WSHistoryInst } from 'init/Ws'

const app = express()

for (const stage of pipeline) {
  const args = stage as Parameters<Application['use']>
  app.use(...args)
}

app.listen(PORT, () => console.log(`Express - localhost:${PORT}`))

process.on('uncaughtException', (err) => {
  console.log(`Error`, err)
})

const wss = new WebSocketServer({ port: WS_PORT, path: WS_PATH })
wss.on('connection', WSHistoryInst.connection)
