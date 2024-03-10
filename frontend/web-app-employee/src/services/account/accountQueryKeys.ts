
export const accountQueryKeys = {
    allAccounts: () => ["GET_ALL_ACCOUNTS"],
    account: (id?: string) => ["GET_ACCOUNT", id]
}