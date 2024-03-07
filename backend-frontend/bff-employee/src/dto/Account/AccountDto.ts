import { Account } from 'entities/Account'

export interface AccountDto extends Account {
    userName?: string
}
