import express from 'express'

import { RouterHelper } from './lib'
import { AccountControllerInst } from 'init/Account'

const AccountRouter = express.Router()

RouterHelper.use(AccountRouter, AccountControllerInst, [
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
    path: '/close',
    handlers: [AccountControllerInst.CloseAccount],
  },
  {
    method: 'post',
    path: '/withdraw',
    handlers: [AccountControllerInst.Withdraw],
  },
  {
    method: 'post',
    path: '/deposit',
    handlers: [AccountControllerInst.Deposit],
  },
  {
    method: 'get',
    path: '/:AccountId',
    handlers: [AccountControllerInst.GetAccount],
  },
])

export default AccountRouter
