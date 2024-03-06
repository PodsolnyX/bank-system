import { OperationHistoryController } from 'controllers/OperationHistory'
import { OperationHistoryService } from 'services/OperationHistoryService'

export const OperationHistoryInst = new OperationHistoryService()
export const OperationHistoryControllerInst = new OperationHistoryController(
  OperationHistoryInst
)
