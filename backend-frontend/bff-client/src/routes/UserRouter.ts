import express from 'express'

import { RouterHelper } from './lib'
import { UserControllerInst } from 'init/User'

const UserRouter = express.Router()

RouterHelper.use(UserRouter, UserControllerInst, [
  {
    method: 'post',
    path: '/profile',
    handlers: [UserControllerInst.GetProfile],
  },
  {
    method: 'post',
    path: '/logout',
    handlers: [UserControllerInst.Logout],
  },
  {
    method: 'post',
    path: '/register',
    handlers: [UserControllerInst.Register],
  },
])

export default UserRouter
