import { Account } from "entities/Account";
import { IAccountRepo } from "services/AccountService";
import axios from 'axios';

class AccountRepo implements IAccountRepo {
    async GetProfile() {
        return (await axios.get<Account>('https://jsonplaceholder.typicode.com/todos/1')).data
    }
}

export default AccountRepo