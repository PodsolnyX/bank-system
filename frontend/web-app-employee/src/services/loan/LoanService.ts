import {instance} from "../../api/instance.ts";
import {LoanDto} from "./models/LoanDto.ts";

class LoanService {
    async getAllLoans() {
        return instance.get<LoanDto[]>('/loan/employee')
    }

    async getLoan(id: string) {
        return instance.get<LoanDto>(`/loan/employee/${id}`)
    }
}

const accountService = new LoanService();

export default accountService;