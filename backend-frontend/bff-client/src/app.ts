import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import UserRouter from 'routes/UserRouter'
import AccountRouter from 'routes/AccountRouter'
import LoanRouter from 'routes/LoanRouter'
import OperationHistoryRouter from 'routes/OperationHistoryRouter'
import { AuthMiddlewareInst } from 'init/AuthMiddleware'
import bodyParser from 'body-parser'

const app = express()
const port = process.env.PORT || 3000

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(cookieParser())
app.use(bodyParser.json())

app.use('/user', UserRouter)

app.use('*', AuthMiddlewareInst())

app.use('/account', AccountRouter)
app.use('/loan', LoanRouter)
app.use('/operationHistory', OperationHistoryRouter)

app.use((_req, res) => res.sendStatus(404))

app.listen(port, () => console.log(`Express - localhost:${port}`))

process.on('uncaughtException', err => {
    console.log(`Error`, err)
})