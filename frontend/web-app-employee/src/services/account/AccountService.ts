import {instance} from "../../api/instance.ts";
import {AccountDto} from "./models/AccountDto.ts";

class AccountService {
    async getAllAccounts() {
        return instance.get<AccountDto[]>('/account/employee')
    }

    async getAccount(id: string) {
        return instance.get<AccountDto>(`/account/employee/${id}`)
    }
}

const accountService = new AccountService();

export default accountService;