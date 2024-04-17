import { PreferencesController } from 'controllers/Preferences'
import { PreferencesService } from 'services/PreferencesService'
import { PreferencesRepo } from 'repos/PreferencesRepo'
import { CacheServiceInst } from 'init/Cache'

export const PreferencesRepositoryInst = new PreferencesRepo()
export const PreferencesServiceInst = new PreferencesService(PreferencesRepositoryInst)
export const PreferencesControllerInst = new PreferencesController(
  PreferencesServiceInst,
  CacheServiceInst
)