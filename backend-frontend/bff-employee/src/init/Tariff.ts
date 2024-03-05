import { TariffController } from 'controllers/Tariff'
import { TariffService } from 'services/TariffService'
import { TariffRepo } from 'repos/TariffRepo'

export const TariffRepositoryInst = new TariffRepo()
export const TariffServiceInst = new TariffService(TariffRepositoryInst)
export const TariffControllerInst = new TariffController(TariffServiceInst)
