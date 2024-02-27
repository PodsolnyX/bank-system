import express from 'express'
import { OperationHistoryController } from 'controllers/OperationHistory'
import { OperationHistoryService } from 'services/OperationHistoryService'
import { OperationHistoryRepo } from 'repos/OperationHistoryRepo'

import { RouterHelper } from './lib'

const OperationHistoryRouter = express.Router()

const OperationHistoryRepositoryInst = new OperationHistoryRepo()
const OperationHistoryInst = new OperationHistoryService(OperationHistoryRepositoryInst)
const OperationHistoryControllerInst = new OperationHistoryController(
  OperationHistoryInst
)

RouterHelper.use(OperationHistoryRouter, OperationHistoryControllerInst, [
  {
    method: 'get',
    path: '/',
    handlers: [OperationHistoryControllerInst.GetOperationHistory],
  },
])

export default OperationHistoryRouter
