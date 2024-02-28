import { IOperationHistoryRepo } from 'services/OperationHistoryService'
import { MainInstance } from 'request/MainInstance'
import { PaginationReq, WithUser } from 'dto/Common'
import { SearchOperationUserDto, OperationDto } from 'dto/OperationHistory'

class OperationHistoryRepo implements IOperationHistoryRepo {
  async GetOperationHistory(Dto: WithUser<PaginationReq<SearchOperationUserDto>>) {
    return (
      await MainInstance.get<OperationDto[]>(
        'https://jsonplaceholder.typicode.com/todos/1',
        {
          headers: {
            Authorization: Dto.Authorization,
          },
        }
      )
    ).data
  }
}

export default OperationHistoryRepo
