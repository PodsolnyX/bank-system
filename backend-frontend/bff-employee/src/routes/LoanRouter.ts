import express from 'express'

import { RouterHelper } from './lib'
import { LoanControllerInst } from 'init/Loan'

const LoanRouter = express.Router()

RouterHelper.use(LoanRouter, LoanControllerInst, [
  {
    method: 'get',
    path: '/loans',
    handlers: [LoanControllerInst.GetLoans],
  },
  {
    method: 'get',
    path: '/:LoanId',
    handlers: [LoanControllerInst.GetLoan],
  },
  {
    method: 'get',
    path: '/:UserId/loan/:LoanId',
    handlers: [LoanControllerInst.GetUserPayments],
  },
])

export default LoanRouter
