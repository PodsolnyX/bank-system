import {useQuery} from "@tanstack/react-query";
import {operationHistoryQueryKeys} from "../../../services/operationHistory/operationHistoryQueryKeys.ts";
import operationHistoryService from "../../../services/operationHistory/OperationHistoryService.ts";
import {useState} from "react";
import {SearchOperationDto} from "../../../services/operationHistory/models/SearchOperationDto.ts";

export function useHistory() {

    const [params, setParams] = useState<SearchOperationDto>({});

    const history =  useQuery({
        queryKey: operationHistoryQueryKeys.history(params),
        queryFn: () => operationHistoryService.getHistory(params),
        select: ({data}) => data,
    })

    return {
        history,
        params,
        setParams
    }
}