import {SearchOperationDto} from "./models/SearchOperationDto.ts";

export const operationHistoryQueryKeys = {
    history: (params: SearchOperationDto) => ["GET_OPERATION_HISTORY", params]
}