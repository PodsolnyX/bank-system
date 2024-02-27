import { AccountDto, CloseAccountDto, DepositDto, OpenAccountDto, WithdrawDto, SearchAccountDto, GetAccountDto } from "dto/Account"
import { PaginationReq, WithUser } from "dto/Common"

export interface IAccountService {
    OpenAccount(Dto: WithUser<OpenAccountDto>): Promise<AccountDto>
    CloseAccount(Dto: WithUser<CloseAccountDto>): Promise<void>
    GetAccounts(Dto: WithUser<PaginationReq<SearchAccountDto>>): Promise<AccountDto[]>
    GetAccount(Dto: WithUser<GetAccountDto>): Promise<AccountDto>
    Deposit(Dto: WithUser<DepositDto>): Promise<void>
    Withdraw(Dto: WithUser<WithdrawDto>): Promise<void>
}