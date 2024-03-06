import {instance} from "../../api/instance.ts";

class AccountService {
    async getAllAccounts() {
        return instance.get('/account/user')
    }
}

const accountService = new AccountService();

export default accountService;