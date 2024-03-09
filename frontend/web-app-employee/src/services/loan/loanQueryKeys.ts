
export const loanQueryKeys = {
    allLoans: () => ["GET_ALL_LOANS"],
    loan: (id?: string) => ["GET_LOAN", id]
}