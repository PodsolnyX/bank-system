import { Response } from 'express'
import {CreateTariffReq, DeleteTariffReq, GetTariffsReq} from './types'
import { Extractor } from '../lib/Extractor'
import { TariffService } from 'services/TariffService'
import {AuthHelper} from "../../common/Auth";

class TariffController {
  private _TariffService: TariffService

  constructor(TariffService: TariffService) {
    this._TariffService = TariffService
  }

  async GetTariffs(req: GetTariffsReq, res: Response) {
    const data = await this._TariffService.GetTariffs(Extractor.ExtractParams(req), AuthHelper.Data(req))
    res.status(200).send(data)
  }

  async CreateTariff(req: CreateTariffReq, res: Response) {
    const data = await this._TariffService.CreateTariff(Extractor.ExtractBody(req), AuthHelper.Data(req))
    res.status(200).send(data)
  }

  async DeleteTariff(req: DeleteTariffReq, res: Response) {
    const data = await this._TariffService.DeleteTariff(Extractor.ExtractParams(req), AuthHelper.Data(req))
    res.status(200).send(data)
  }
}

export default TariffController
