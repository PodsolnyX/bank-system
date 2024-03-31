import UserRouter from './UserRouter'
import AccountRouter from './AccountRouter'
import LoanRouter from './LoanRouter'
import TariffRouter from './TariffRouter'
import OperationHistoryRouter from './OperationHistoryRouter'
import PreferencesRouter from './PreferencesRouter'

export const ROUTER = {
  ACCOUNT: AccountRouter,
  LOAN: LoanRouter,
  HISTORY: OperationHistoryRouter,
  PREFERENCES: PreferencesRouter,
  TARIFF: TariffRouter,
  USER: UserRouter,
}
