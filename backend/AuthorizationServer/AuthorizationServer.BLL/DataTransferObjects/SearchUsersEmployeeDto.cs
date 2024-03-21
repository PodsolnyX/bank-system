using Common.DataTransfer;

namespace AuthorizationServer.BLL.DataTransferObjects {
  public class SearchUsersEmployeeDto: PaginationRequest {
    public List<Guid> UserIds { get; set; } = []; 
    public string? Mail { get; set; }
    public string? Name { get; set; }
    public bool? IsBanned { get; set; }
    public bool? IsEmployee { get; set; }
  }
}