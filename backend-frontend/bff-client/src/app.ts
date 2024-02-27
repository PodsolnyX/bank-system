import express from 'express'
import cookieParser from 'cookie-parser'
import UserRouter from 'routes/UserRouter'
import AccountRouter from 'routes/AccountRouter'
import LoanRouter from 'routes/LoanRouter'
import OperationHistoryRouter from 'routes/OperationHistoryRouter'

const app = express()
const port = process.env.PORT || 3000

app.use(cookieParser())

app.use('/user', UserRouter)
app.use('/account', AccountRouter)
app.use('/loan', LoanRouter)
app.use('/operationHistory', OperationHistoryRouter)

app.use((_req, res) => {
  res.sendStatus(404)
})

app.listen(port, () => console.log(`Express - localhost:${port}`))
