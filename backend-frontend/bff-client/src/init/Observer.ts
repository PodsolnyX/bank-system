import { ObserverService } from 'services/ObserverService'
import { ObserverRepo } from 'repos/ObserverRepo'

export const ObserverRepositoryInst = new ObserverRepo()
export const ObserverServiceInst = new ObserverService(ObserverRepositoryInst)
