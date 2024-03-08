import { PaginationReq, WithUser } from 'dto/Common'
import {SearchTariffDto, TariffDto} from 'dto/Loan'
import {LoanAPI} from "../../repos/lib";
import {DeleteTariffDto} from "../../dto/Loan/DeleteTariffDto";
import {CreateTariffDto} from "../../dto/Loan/CreateTariffDto";

class TariffService {

  constructor() {

    this.GetTariffs = this.GetTariffs.bind(this)
  }

  async GetTariffs(Dto: WithUser<PaginationReq<SearchTariffDto>>) {
    return (
        await LoanAPI.Req.get<TariffDto[]>('/tariff/employee', {
          params: Dto,
        })
    ).data
  }

    async CreateTariff(Dto: WithUser<CreateTariffDto>) {
        return (
            await LoanAPI.Req.post('/tariff/employee', Dto)
        ).data
    }

    async DeleteTariff(Dto: WithUser<DeleteTariffDto>) {
        return (
            await LoanAPI.Req.delete(`/tariff/employee/${Dto.tariffId}`)
        ).data
    }
}

export default TariffService
