import {
  SearchAccountDto,
  GetAccountDto,
} from 'dto/Account'
import { PaginationReq } from 'dto/Common'
import {AuthAPI, CoreAPI} from "../../repos/lib";
import {Account} from "../../entities/Account";
import {User} from "../../entities/User";
import {AuthInfo} from "common/Auth";

class AccountService {

  constructor() {

    this.GetAccount = this.GetAccount.bind(this)
    this.GetAllAccounts = this.GetAllAccounts.bind(this)
  }

  async GetAllAccounts(Dto: PaginationReq<SearchAccountDto>, AuthInfo: AuthInfo) {

    const accountsRes = await CoreAPI.Req(AuthInfo).get<Account[]>(
        '/account/employee', {
      params: Dto,
    })

    const userIds = [...new Set(accountsRes.data.map(it => it.userId))]

    const usersRes = await AuthAPI.Req(AuthInfo).get<User[]>('/user/profiles', {
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

  async GetAccount(Dto: GetAccountDto, AuthInfo: AuthInfo) {
    return (await CoreAPI.Req(AuthInfo).get<Account>(`/account/employee/${Dto.AccountId}`)).data
  }
}

export default AccountService
