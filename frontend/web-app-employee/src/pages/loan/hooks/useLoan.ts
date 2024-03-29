import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {loanQueryKeys} from "../../../services/loan/loanQueryKeys.ts";
import loanService from "../../../services/loan/LoanService.ts";

export function useLoan() {

    const {loanId} = useParams()

    return useQuery({
        queryKey: loanQueryKeys.loan(loanId),
        queryFn: () => loanService.getLoan(loanId || ""),
        select: ({data}) => data,
        enabled: !!loanId
    })
}