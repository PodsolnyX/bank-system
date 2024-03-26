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
    path: '/:accountId',
    handlers: [AccountControllerInst.CloseAccount],
  },
  {
    method: 'post',
    path: '/:accountId/withdraw',
    handlers: [AccountControllerInst.Withdraw],
  },
  {
    method: 'post',
    path: '/:accountId/deposit',
    handlers: [AccountControllerInst.Deposit],
  },
  {
    method: 'get',
    path: '/:accountId',
    handlers: [AccountControllerInst.GetAccount],
  },
  {
    method: 'post',
    path: '/:fromAccountId/transfer/:toAccountId',
    handlers: [AccountControllerInst.TransferSelf],
  },
  {
    method: 'post',
    path: '/:fromAccountId/transfer/:userId',
    handlers: [AccountControllerInst.TransferUser],
  },
])

export default AccountRouter
