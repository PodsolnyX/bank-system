export enum Microservices {
    Core = 'http://109.107.189.133:7002',
    Loan = 'http://109.107.189.133:7003',
    Operation = 'http://109.107.189.133:7004',
    User = 'http://109.107.189.133:7005',
    Observer = 'http://109.107.189.133:7006'
}

export enum BffRoutes {
    User = '/auth/user',
    Account = '/account/user',
    Preferences = '/preferences/user',
    Loan = '/loan/user',
    Tariff = '/tariff/user',
    History = '/operation-history/user',
}