namespace Arbiter.BLL.DataTransferObjects;

public class InternalApiQueries {
    public const string ApiQueries = "InternalAPIQueries";
    public string BaseUrlCore { get; set; }
    public string BaseUrlLoan { get; set; }
    public string BaseCoreController { get; set; }
    public string BaseLoanController { get; set; }
}