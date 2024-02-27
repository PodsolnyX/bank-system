import { IOperationHistoryRepo } from 'services/OperationHistoryService'
import { MainInstance } from 'repos/lib'
import { PaginationReq } from 'dto/Common'
import { SearchOperationUserDto, OperationDto } from 'dto/OperationHistory'

class OperationHistoryRepo implements IOperationHistoryRepo {
  async GetOperationHistory(Dto: PaginationReq<SearchOperationUserDto>) {
    return (
      await MainInstance.get<OperationDto[]>(
        'https://jsonplaceholder.typicode.com/todos/1'
      )
    ).data
  }
}

export default OperationHistoryRepo
