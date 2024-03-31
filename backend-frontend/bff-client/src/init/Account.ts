import { AccountController } from 'controllers/Account'
import { AccountService } from 'services/AccountService'
import { AccountRepo } from 'repos/AccountRepo'
import { PreferencesRepositoryInst } from 'init/Preferences'

export const AccountRepositoryInst = new AccountRepo()
export const AccountServiceInst = new AccountService(
  AccountRepositoryInst,
  PreferencesRepositoryInst
)
export const AccountControllerInst = new AccountController(AccountServiceInst)
