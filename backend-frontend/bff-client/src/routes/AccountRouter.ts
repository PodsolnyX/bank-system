import express from 'express'
import { AccountController } from 'controllers/Account'
import { AccountService } from 'services/AccountService'
import { AccountRepo } from 'repos/AccountRepo'

import { RouterHelper } from './lib'

const AccountRouter = express.Router()

const AccountRepositoryInst = new AccountRepo()
const AccountServiceInst = new AccountService(AccountRepositoryInst)
const AccountControllerInst = new AccountController(AccountServiceInst)

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
