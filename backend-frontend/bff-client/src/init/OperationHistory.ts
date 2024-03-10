import { OperationHistoryController } from 'controllers/OperationHistory'
import { OperationHistoryService } from 'services/OperationHistoryService'
import { OperationHistoryRepo } from 'repos/OperationHistoryRepo'

export const OperationHistoryRepositoryInst = new OperationHistoryRepo()
export const OperationHistoryInst = new OperationHistoryService(
  OperationHistoryRepositoryInst
)
export const OperationHistoryControllerInst = new OperationHistoryController(
  OperationHistoryInst
)
