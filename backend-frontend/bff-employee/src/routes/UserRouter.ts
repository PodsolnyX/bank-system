import express from 'express'

import { RouterHelper } from './lib'
import { UserControllerInst } from 'init/User'

const UserRouter = express.Router()

RouterHelper.use(UserRouter, UserControllerInst, [
  {
    method: 'get',
    path: '/',
    handlers: [UserControllerInst.GetProfile],
  },
  {
    method: 'get',
    path: '/status',
    handlers: [UserControllerInst.GetUserStatus],
  },
  {
    method: 'post',
    path: '/logout',
    handlers: [UserControllerInst.Logout],
  },
  {
    method: 'post',
    path: '/',
    handlers: [UserControllerInst.Register],
  },
])

export default UserRouter
