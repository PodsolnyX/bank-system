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
    path: '/:id',
    handlers: [LoanControllerInst.GetLoan],
  },
  {
    method: 'get',
    path: '/tariffs',
    handlers: [LoanControllerInst.GetTariffs],
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
])

export default LoanRouter
