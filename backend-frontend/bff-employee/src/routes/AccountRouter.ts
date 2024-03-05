import express from 'express'

import { RouterHelper } from './lib'
import { AccountControllerInst } from 'init/Account'

const AccountRouter = express.Router()

RouterHelper.use(AccountRouter, AccountControllerInst, [
  {
    method: 'get',
    path: '/',
    handlers: [AccountControllerInst.GetAccounts],
  },
  {
    method: 'post',
    path: '/',
    handlers: [AccountControllerInst.OpenAccount],
  },
  {
    method: 'delete',
    path: '/:AccountId',
    handlers: [AccountControllerInst.CloseAccount],
  },
  {
    method: 'post',
    path: '/:AccountId/withdraw',
    handlers: [AccountControllerInst.Withdraw],
  },
  {
    method: 'post',
    path: '/:AccountId/deposit',
    handlers: [AccountControllerInst.Deposit],
  },
  {
    method: 'get',
    path: '/:AccountId',
    handlers: [AccountControllerInst.GetAccount],
  },
])

export default AccountRouter
