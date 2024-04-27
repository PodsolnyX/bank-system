export enum CBState {
  Closed,
  Open,
}

export type CBRecord = {
    time: number
    type: 'Success' | 'Error'
}

export type CBQueue = {
  Records: CBRecord[]
  State: CBState
  Timeout?: number | null
}

export type CBMicroservice = any

export type CBQueues = {
  [key in CBMicroservice]: CBQueue
}

export type CBConfig = {
  Threshold: number
  RecordsMin: number
  RecordsMax: number
  TimeoutMs: number
  IntervalMs: number
}
