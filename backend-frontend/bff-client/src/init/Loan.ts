import { LoanController } from 'controllers/Loan'
import { LoanService } from 'services/LoanService'
import { LoanRepo } from 'repos/LoanRepo'
import { CacheServiceInst } from 'init/Cache'

export const LoanRepositoryInst = new LoanRepo()
export const LoanServiceInst = new LoanService(LoanRepositoryInst)
export const LoanControllerInst = new LoanController(LoanServiceInst, CacheServiceInst)
