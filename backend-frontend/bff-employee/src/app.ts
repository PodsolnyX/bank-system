import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import UserRouter from 'routes/UserRouter'
import AccountRouter from 'routes/AccountRouter'
import LoanRouter from 'routes/LoanRouter'
import TariffRouter from 'routes/TariffRouter'
import OperationHistoryRouter from 'routes/OperationHistoryRouter'

import { AuthMiddlewareInst } from 'init/AuthMiddleware'
import PreferenceRouter from "./routes/PreferenceRouter";

const app = express()
const port = process.env.PORT || 3000

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(bodyParser.json())

app.use('*', AuthMiddlewareInst())

app.use('/auth/user', UserRouter)
app.use('/account/employee', AccountRouter)
app.use('/loan/employee', LoanRouter)
app.use('/tariff/user', TariffRouter)
app.use('/operation-history/employee', OperationHistoryRouter)
app.use('/preference/employee', PreferenceRouter)

app.use((_req, res) => res.sendStatus(404))

app.listen(port, () => console.log(`Express - localhost:${port}`))

process.on('uncaughtException', (err) => {
  console.log(`Error`, err)
})
