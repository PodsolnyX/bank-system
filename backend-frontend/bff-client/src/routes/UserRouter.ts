import express from 'express'

import { RouterHelper } from './lib'
import { UserControllerInst } from 'init/User'

const UserRouter = express.Router()

RouterHelper.use(UserRouter, UserControllerInst, [
  {
    method: 'get',
    path: '/:userid',
    handlers: [UserControllerInst.GetAccessInfoById],
  },
])

export default UserRouter
