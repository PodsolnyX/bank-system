import {
  SearchAccountDto,
  GetAccountDto, AccountDto,
} from 'dto/Account'
import { PaginationReq, WithUser } from 'dto/Common'
import {CoreAPI} from "../../repos/lib";
import {Account} from "../../entities/Account";

class AccountService {

  constructor() {

    this.GetAccount = this.GetAccount.bind(this)
    this.GetAllAccounts = this.GetAllAccounts.bind(this)
  }

  async GetAllAccounts(Dto: WithUser<PaginationReq<SearchAccountDto>>) {
    return (
        await CoreAPI.Req.get<AccountDto[]>('/account/employee', {
          params: Dto,
        })
    ).data
  }

  async GetAccount(Dto: WithUser<GetAccountDto>) {
    return (await CoreAPI.Req.get<Account>(`/account/user/${Dto.AccountId}`)).data
  }
}

export default AccountService
