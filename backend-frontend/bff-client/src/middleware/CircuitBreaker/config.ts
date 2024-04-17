import { Microservices } from 'common/Microservices'
import { CBConfig, CBQueues, CBState } from 'middleware/CircuitBreaker/types'

export const DefaultQueues: CBQueues = {
  [Microservices.Core]: { Records: [], State: CBState.Closed },
  [Microservices.Loan]: { Records: [], State: CBState.Closed },
  [Microservices.Operation]: { Records: [], State: CBState.Closed },
}

export const DefaultConfig: CBConfig = {
  TimeoutMs: 7000,
  IntervalMs: 60000,
  RecordsMax: 30,
  RecordsMin: 10,
  Threshold: 0.7,
}
