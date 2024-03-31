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
    path: '/users',
    handlers: [UserControllerInst.GetUsers],
  },
  {
    method: 'get',
    path: '/user/:UserId',
    handlers: [UserControllerInst.GetUserInfo],
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
    path: '/create',
    handlers: [UserControllerInst.CreateUser],
  },
  {
    method: 'delete',
    path: '/:UserId/ban',
    handlers: [UserControllerInst.BanUser],
  },
  {
    method: 'post',
    path: '/:UserId/unban',
    handlers: [UserControllerInst.UnbanUser],
  },
])

export default UserRouter
