import express from 'express'
import { RouterHelper } from './lib'
import { OperationHistoryControllerInst } from 'init/OperationHistory'

const OperationHistoryRouter = express.Router()

RouterHelper.use(OperationHistoryRouter, OperationHistoryControllerInst, [
  {
    method: 'get',
    path: '/',
    handlers: [OperationHistoryControllerInst.GetOperationHistory],
  },
])

export default OperationHistoryRouter
