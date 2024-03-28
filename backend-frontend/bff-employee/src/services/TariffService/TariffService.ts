import { PaginationReq } from 'dto/Common'
import {SearchTariffDto, TariffDto} from 'dto/Loan'
import {LoanAPI} from "../../repos/lib";
import {DeleteTariffDto} from "../../dto/Loan/DeleteTariffDto";
import {CreateTariffDto} from "../../dto/Loan/CreateTariffDto";
import {AuthInfo} from "common/Auth";

class TariffService {

  constructor() {

    this.GetTariffs = this.GetTariffs.bind(this)
  }

  async GetTariffs(Dto: PaginationReq<SearchTariffDto>, AuthInfo: AuthInfo) {
    return (
        await LoanAPI.Req(AuthInfo).get<TariffDto[]>('/tariff/employee', {
          params: Dto,
        })
    ).data
  }

    async CreateTariff(Dto: CreateTariffDto, AuthInfo: AuthInfo) {
        return (
            await LoanAPI.Req(AuthInfo).post('/tariff/employee', Dto)
        ).data
    }

    async DeleteTariff(Dto: DeleteTariffDto, AuthInfo: AuthInfo) {
        return (
            await LoanAPI.Req(AuthInfo).delete(`/tariff/employee/${Dto.tariffId}`)
        ).data
    }
}

export default TariffService
