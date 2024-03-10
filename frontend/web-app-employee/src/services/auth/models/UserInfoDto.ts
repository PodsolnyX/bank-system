import {UserDto} from "./UserDto.ts";
import {AccountDto} from "../../account/models/AccountDto.ts";
import {LoanDto} from "../../loan/models/LoanDto.ts";

export interface UserInfoDto {
    user: UserDto,
    accounts: AccountDto[],
    loans: LoanDto[]
}