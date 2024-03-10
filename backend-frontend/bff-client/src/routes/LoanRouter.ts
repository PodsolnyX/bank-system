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
    method: 'post',
    path: '/charge',
    handlers: [LoanControllerInst.ChargeLoan],
  },
  {
    method: 'post',
    path: '/request',
    handlers: [LoanControllerInst.RequestLoan],
  },
  {
    method: 'get',
    path: '/payments',
    handlers: [LoanControllerInst.GetPayments],
  },
  {
    method: 'post',
    path: '/',
    handlers: [LoanControllerInst.ExecuteJob],
  },
])

export default LoanRouter
