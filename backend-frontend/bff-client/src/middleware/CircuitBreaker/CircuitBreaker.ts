import { DefaultQueues, DefaultConfig } from 'middleware/CircuitBreaker/config'
import { CBMicroservice, CBRecord, CBState } from './types'

export class CB {
  private static _Queues = { ...DefaultQueues }
  private static _Config = { ...DefaultConfig }

  public static _Update(service: CBMicroservice, record?: CBRecord) {
    let State = CB._Queues[service].State
    let Timeout = CB._Queues[service].Timeout

    let NewRecords = [...CB._Queues[service].Records]
    if (record) {
      NewRecords.push(record)
    }

    NewRecords = NewRecords.filter(
      (record) => record.time + CB._Config.IntervalMs > Date.now()
    )
    NewRecords.sort((a, b) => b.time - a.time)

    NewRecords.length = Math.min(CB._Config.RecordsMax, NewRecords.length)

    if (NewRecords.length >= CB._Config.RecordsMin) {
      const errors = NewRecords.filter((rec) => rec.type === 'Error').length
      if (State === CBState.Open) {
        // Half-Open
        if ((Timeout || 0) < Date.now()) {
          if (errors / NewRecords.length < CB._Config.Threshold) {
            State = CBState.Closed
            Timeout = null
            NewRecords = []
          } else {
            State = CBState.Open
            Timeout = Date.now() + CB._Config.TimeoutMs
          }
        }
      } else if (State === CBState.Closed) {
        if (errors / NewRecords.length >= CB._Config.Threshold) {
          State = CBState.Open
          Timeout = Date.now() + CB._Config.TimeoutMs
        }
      }
    }

    CB._Queues[service].State = State
    CB._Queues[service].Records = NewRecords
    CB._Queues[service].Timeout = Timeout

    return CB._Queues[service]
  }

  private static _Add(service: CBMicroservice, record: CBRecord) {
    CB._Update(service, record)
  }

  static Error(service: CBMicroservice) {
    CB._Add(service, { type: 'Error', time: Date.now() })
  }

  static Success(service: CBMicroservice) {
    CB._Add(service, { type: 'Success', time: Date.now() })
  }

  static Pass(service: CBMicroservice) {
    const NewQueue = CB._Update(service)
    switch (NewQueue.State) {
      case CBState.Closed:
        return true
      case CBState.Open:
        return (NewQueue.Timeout || 0) < Date.now() ? Math.random() > 0.5 : false
    }
  }
}
