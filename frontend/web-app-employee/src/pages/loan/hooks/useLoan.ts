import {useParams} from "react-router-dom";

import {useQuery} from "@tanstack/react-query";
import {loanQueryKeys} from "../../../services/loan/loanQueryKeys.ts";
import loanService from "../../../services/loan/LoanService.ts";

export function useLoan() {

    const {id} = useParams()

    return useQuery({
        queryKey: loanQueryKeys.loan(id),
        queryFn: () => loanService.getLoan(id || ""),
        select: ({data}) => data,
        enabled: !!id
    })
}