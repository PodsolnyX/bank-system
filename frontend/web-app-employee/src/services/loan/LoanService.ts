import {instance} from "../../api/instance.ts";
import {LoanDto} from "./models/LoanDto.ts";
import {UserPaymentsDto} from "./models/UserPaymentsDto.ts";

class LoanService {
    async getAllLoans() {
        return instance.get<LoanDto[]>('/loan/employee')
    }

    async getLoan(id: string) {
        return instance.get<LoanDto>(`/loan/employee/${id}`)
    }

    async getUserPayments(userId: string, loanId: string) {
        return instance.get<UserPaymentsDto[]>(`/loan/employee/${userId}/loan/${loanId}`)
    }
}

const accountService = new LoanService();

export default accountService;