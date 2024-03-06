import { AccountController } from 'controllers/Account'
import { AccountService } from 'services/AccountService'

export const AccountServiceInst = new AccountService()
export const AccountControllerInst = new AccountController(AccountServiceInst)
