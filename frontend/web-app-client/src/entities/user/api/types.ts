export type GetAccountsInfoReq = {
  userid: string
}
export type GetAccessInfoResp = {
  isEmployee: boolean
  bannedAt: string | null | undefined
}
