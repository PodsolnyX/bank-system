import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {loanQueryKeys} from "../../../services/loan/loanQueryKeys.ts";
import loanService from "../../../services/loan/LoanService.ts";

export function useUserPayments() {

    const {userId, loanId} = useParams()

    return useQuery({
        queryKey: loanQueryKeys.payments(loanId),
        queryFn: () => loanService.getUserPayments(userId || "", loanId || ""),
        select: ({data}) => data,
        enabled: !!loanId && !!userId
    })
}