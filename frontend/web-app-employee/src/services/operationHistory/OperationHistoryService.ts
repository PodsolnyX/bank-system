import {instance} from "../../api/instance.ts";
import {OperationDto} from "./models/OperationDto.ts";
import {SearchOperationDto} from "./models/SearchOperationDto.ts";

class OperationHistoryService {
    async getHistory(params: SearchOperationDto) {
        return instance.get<OperationDto[]>(`/operation-history/employee/`, {
            params
        })
    }
}

const operationHistoryService = new OperationHistoryService();

export default operationHistoryService;