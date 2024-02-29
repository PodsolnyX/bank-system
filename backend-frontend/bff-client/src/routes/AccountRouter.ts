import express from 'express'

import { RouterHelper } from './lib'
import { AccountControllerInst } from 'init/Account'

const AccountRouter = express.Router()

RouterHelper.use(AccountRouter, AccountControllerInst, [
  {
    method: 'get',
    path: '/:id',
    handlers: [AccountControllerInst.GetAccount],
  },
  {
    method: 'get',
    path: '/accounts',
    handlers: [AccountControllerInst.GetAccounts],
  },
  {
    method: 'post',
    path: '/open',
    handlers: [AccountControllerInst.OpenAccount],
  },
  {
    method: 'delete',
    path: '/:id/close',
    handlers: [AccountControllerInst.CloseAccount],
  },
  {
    method: 'post',
    path: '/:id/withdraw',
    handlers: [AccountControllerInst.Withdraw],
  },
  {
    method: 'post',
    path: '/:id/deposit',
    handlers: [AccountControllerInst.Deposit],
  },
])

export default AccountRouter
