import { TariffController } from 'controllers/Tariff'
import { TariffService } from 'services/TariffService'

export const TariffServiceInst = new TariffService()
export const TariffControllerInst = new TariffController(TariffServiceInst)
