import { Response } from 'express'
import { GetTariffsReq } from './types'

import { TariffService } from 'services/TariffService'
import { ReqHelper } from 'common'
import { ObserverService } from 'services/ObserverService'

class TariffController {
  private _TariffService: TariffService
  private _ObserverService: ObserverService

  constructor(TariffService: TariffService, ObserverService: ObserverService) {
    this._TariffService = TariffService
    this._ObserverService = ObserverService
  }

  async GetTariffs(req: GetTariffsReq, res: Response) {
    const data = await this._TariffService.GetTariffs(req.body, ReqHelper.AuthData(req))
    res.status(200).send(data)
    this._ObserverService.Collect(req, 200, data)
  }
}

export default TariffController
