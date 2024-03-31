namespace Tests;

public class ApiTests
{
    [Fact]
    public async Task Test()
    {
        var userId = Guid.NewGuid();
        var token = await new Helper().Authorize(userId);
        var client = new Helper().GetClient(token);

        var accountId = await new Helper().CreateAccount(client);
        await new Helper().Deposit(client, accountId, 1000);
        await Task.Delay(15000);
        var operations = await new Helper().GetOperations(client);
        await new Helper().Deposit(client, accountId, 2000);
        await Task.Delay(15000);
        var newOperations = await new Helper().GetOperations(client);
        var account = await new Helper().GetAccount(client, accountId);

        Assert.Equal(account["amount"].ToString(), "3000");
    }
}

public class ParallelRunner
{
    [Fact]
    public async Task RunTestInParallel100Times()
    {
        int numberOfRuns = 500;
        await Parallel.ForAsync(
            0,
            numberOfRuns,
            async (i, token) =>
            {
                await new ApiTests().Test();
            }
        );
    }
}
