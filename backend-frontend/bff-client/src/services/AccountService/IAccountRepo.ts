import {
  AccountDto,
  CloseAccountDto,
  DepositDto,
  OpenAccountDto,
  WithdrawDto,
  SearchAccountDto,
  GetAccountDto,
} from 'dto/Account'
import { PaginationReq } from 'dto/Common'

export interface IAccountRepo {
  OpenAccount(Dto: OpenAccountDto): Promise<AccountDto>
  CloseAccount(Dto: CloseAccountDto): Promise<void>
  GetAccounts(Dto: PaginationReq<SearchAccountDto>): Promise<AccountDto[]>
  GetAccount(Dto: GetAccountDto): Promise<AccountDto>
  Deposit(Dto: DepositDto): Promise<void>
  Withdraw(Dto: WithdrawDto): Promise<void>
}
