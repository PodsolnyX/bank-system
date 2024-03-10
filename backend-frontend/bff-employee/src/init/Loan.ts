import { LoanController } from 'controllers/Loan'
import { LoanService } from 'services/LoanService'

export const LoanServiceInst = new LoanService()
export const LoanControllerInst = new LoanController(LoanServiceInst)
