import {useQuery} from "@tanstack/react-query";
import {accountQueryKeys} from "../../../services/account/accountQueryKeys.ts";
import accountService from "../../../services/account/AccountService.ts";
import {useParams} from "react-router-dom";

export function useAccount() {

    const {id} = useParams()

    return useQuery({
        queryKey: accountQueryKeys.allAccounts(),
        queryFn: () => accountService.getAccount(id || ""),
        select: ({data}) => data,
        enabled: !!id
    })
}