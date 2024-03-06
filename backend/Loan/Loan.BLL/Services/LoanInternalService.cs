using Loan.DAL;

namespace Loan.BLL.Services;

public class LoanInternalService {
    private readonly LoanDbContext _dbContext;

    public LoanInternalService(LoanDbContext dbContext) {
        _dbContext = dbContext;
    }
}