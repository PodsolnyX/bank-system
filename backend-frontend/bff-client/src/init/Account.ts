import { AccountController } from 'controllers/Account'
import { AccountService } from 'services/AccountService'
import { AccountRepo } from 'repos/AccountRepo'

export const AccountRepositoryInst = new AccountRepo()
export const AccountServiceInst = new AccountService(AccountRepositoryInst)
export const AccountControllerInst = new AccountController(AccountServiceInst)
