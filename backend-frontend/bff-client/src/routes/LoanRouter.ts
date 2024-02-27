import express from 'express'
import { LoanController } from 'controllers/Loan'
import { LoanService } from 'services/LoanService'
import { LoanRepo } from 'repos/LoanRepo'

import { RouterHelper } from './lib'

const LoanRouter = express.Router()

const LoanRepositoryInst = new LoanRepo()
const LoanServiceInst = new LoanService(LoanRepositoryInst)
const LoanControllerInst = new LoanController(LoanServiceInst)

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
