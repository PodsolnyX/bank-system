import express, { Application } from 'express'
import { pipeline } from './pipeline'

import { PORT } from 'app/config'

const app = express()

for (const stage of pipeline) {
  const args = stage as Parameters<Application['use']>
  app.use(...args)
}

app.listen(PORT, () => console.log(`Express - localhost:${PORT}`))

process.on('uncaughtException', (err) => {
  console.log(`Error`, err)
})
