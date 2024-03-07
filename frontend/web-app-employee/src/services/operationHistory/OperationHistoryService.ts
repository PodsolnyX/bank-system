import {instance} from "../../api/instance.ts";
import {OperationDto} from "./models/OperationDto.ts";

class OperationHistoryService {
    async getHistory(id: string[]) {
        return instance.get<OperationDto[]>(`/operation-history/employee/`, {
            params: {
                accountIds: id
            }
        })
    }
}

const operationHistoryService = new OperationHistoryService();

export default operationHistoryService;