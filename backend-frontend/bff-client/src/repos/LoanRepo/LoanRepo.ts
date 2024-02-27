import { Loan } from "entities/Loan";
import { ILoanRepo } from "services/LoanService";
import axios from 'axios';

class LoanRepo implements ILoanRepo {
    async GetProfile() {
        return (await axios.get<Loan>('https://jsonplaceholder.typicode.com/todos/1')).data
    }
}

export default LoanRepo