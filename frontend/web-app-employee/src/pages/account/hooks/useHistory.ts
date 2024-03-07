import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {operationHistoryQueryKeys} from "../../../services/operationHistory/operationHistoryQueryKeys.ts";
import operationHistoryService from "../../../services/operationHistory/OperationHistoryService.ts";

export function useHistory() {

    const {id} = useParams()

    return useQuery({
        queryKey: operationHistoryQueryKeys.history(id),
        queryFn: () => operationHistoryService.getHistory(id || ""),
        select: ({data}) => data,
        enabled: !!id
    })
}