import { LoanController } from 'controllers/Loan'
import { LoanService } from 'services/LoanService'
import { LoanRepo } from 'repos/LoanRepo'

export const LoanRepositoryInst = new LoanRepo()
export const LoanServiceInst = new LoanService(LoanRepositoryInst)
export const LoanControllerInst = new LoanController(LoanServiceInst)