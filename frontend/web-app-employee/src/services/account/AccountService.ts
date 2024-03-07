import {instance} from "../../api/instance.ts";
import {AccountDto} from "./models/AccountDto.ts";

class AccountService {
    async getAllAccounts() {
        return instance.get<AccountDto[]>('/account/employee')
    }
}

const accountService = new AccountService();

export default accountService;