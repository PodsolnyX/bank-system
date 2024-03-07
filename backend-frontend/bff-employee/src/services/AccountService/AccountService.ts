import {
  SearchAccountDto,
  GetAccountDto,
} from 'dto/Account'
import { PaginationReq, WithUser } from 'dto/Common'
import {AuthAPI, CoreAPI} from "../../repos/lib";
import {Account} from "../../entities/Account";
import {User} from "../../entities/User";

class AccountService {

  constructor() {

    this.GetAccount = this.GetAccount.bind(this)
    this.GetAllAccounts = this.GetAllAccounts.bind(this)
  }

  async GetAllAccounts(Dto: WithUser<PaginationReq<SearchAccountDto>>) {

    const accountsRes = await CoreAPI.Req.get<Account[]>(
        '/account/employee', {
      params: Dto,
    })

    const userIds = accountsRes.data.map(it => it.userId)

    const usersRes = await AuthAPI.Req.get<User[]>('/auth/employee', {
      params: {
        userIds: userIds
      },
    })

    return (
        accountsRes.data.map(it => {
          return {
            userName: usersRes.data.find(_it => _it.id === it.userId)?.name || null,
            ...it,
          }
        })
    )
  }

  async GetAccount(Dto: WithUser<GetAccountDto>) {
    return (await CoreAPI.Req.get<Account>(`/account/user/${Dto.AccountId}`)).data
  }
}

export default AccountService
