import { PreferencesController } from 'controllers/Preferences'
import { PreferencesService } from 'services/PreferencesService'
import { PreferencesRepo } from 'repos/PreferencesRepo'
import { ObserverServiceInst } from 'init/Observer'

export const PreferencesRepositoryInst = new PreferencesRepo()
export const PreferencesServiceInst = new PreferencesService(PreferencesRepositoryInst)
export const PreferencesControllerInst = new PreferencesController(
  PreferencesServiceInst,
  ObserverServiceInst
)
