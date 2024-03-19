import { Response } from 'express'
import { GetTariffsReq } from './types'
import { Extractor } from 'common'
import { TariffService } from 'services/TariffService'

class TariffController {
  private _TariffService: TariffService

  constructor(TariffService: TariffService) {
    this._TariffService = TariffService
  }

  async GetTariffs(req: GetTariffsReq, res: Response) {
    const data = await this._TariffService.GetTariffs(Extractor.ExtractParams(req))
    res.status(200).send(data)
  }
}

export default TariffController
