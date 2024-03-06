import {useQuery} from "@tanstack/react-query";
import {accountQueryKeys} from "../../../services/account/accountQueryKeys.ts";
import accountService from "../../../services/account/AccountService.ts";

export function useAccounts() {
    return useQuery({
        queryKey: accountQueryKeys.allAccounts(),
        queryFn: () => accountService.getAllAccounts(),
        select: ({data}) => data
    })
}