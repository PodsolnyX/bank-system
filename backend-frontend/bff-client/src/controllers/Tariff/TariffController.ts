import { Response } from 'express'
import { GetTariffsReq } from './types'

import { TariffService } from 'services/TariffService'
import { ReqHelper } from 'common'

class TariffController {
  private _TariffService: TariffService

  constructor(TariffService: TariffService) {
    this._TariffService = TariffService
  }

  async GetTariffs(req: GetTariffsReq, res: Response) {
    const data = await this._TariffService.GetTariffs(req.body, ReqHelper.AuthData(req))
    res.status(200).send(data)
  }
}

export default TariffController
