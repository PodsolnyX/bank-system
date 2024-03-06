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
    method: 'get',
    path: '/:AccountId',
    handlers: [AccountControllerInst.GetAccount],
  },
])

export default AccountRouter
