import { Operation } from "entities/Operation";
import { IOperationHistoryRepo } from "services/OperationHistoryService";
import axios from 'axios';

class OperationHistoryRepo implements IOperationHistoryRepo {
    async GetProfile() {
        return (await axios.get<Operation>('https://jsonplaceholder.typicode.com/todos/1')).data
    }
}

export default OperationHistoryRepo