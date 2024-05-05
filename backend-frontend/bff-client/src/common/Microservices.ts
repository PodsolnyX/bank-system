import { BACKEND_URL } from "common/config";

export const Microservices = {
    Core: `${BACKEND_URL}:7002`,
    Loan: `${BACKEND_URL}:7003`,
    Operation: `${BACKEND_URL}:7004`,
    User: `${BACKEND_URL}:7005`,
    Observer: `${BACKEND_URL}:7006`
}

export enum BffRoutes {
    User = '/auth/user',
    Account = '/account/user',
    Preferences = '/preferences/user',
    Loan = '/loan/user',
    Tariff = '/tariff/user',
    History = '/operation-history/user',
}