using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Arbiter.DAL.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ChargeLoanTransactions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    AccountId = table.Column<Guid>(type: "uuid", nullable: false),
                    TariffId = table.Column<Guid>(type: "uuid", nullable: false),
                    Amount = table.Column<int>(type: "integer", nullable: false),
                    CurrencyType = table.Column<int>(type: "integer", nullable: false),
                    CheckAccountStatus = table.Column<int>(type: "integer", nullable: false),
                    CheckAccountRetries = table.Column<int>(type: "integer", nullable: false),
                    AccountLoanChargeStatus = table.Column<int>(type: "integer", nullable: false),
                    AccountLoanChargeRetries = table.Column<int>(type: "integer", nullable: false),
                    LoanChargeStatus = table.Column<int>(type: "integer", nullable: false),
                    LoanChargeRetries = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChargeLoanTransactions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RequestLoanTransactions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    AccountId = table.Column<Guid>(type: "uuid", nullable: false),
                    TariffId = table.Column<Guid>(type: "uuid", nullable: false),
                    Amount = table.Column<int>(type: "integer", nullable: false),
                    CurrencyType = table.Column<int>(type: "integer", nullable: false),
                    CheckAccountStatus = table.Column<int>(type: "integer", nullable: false),
                    CheckAccountRetries = table.Column<int>(type: "integer", nullable: false),
                    TakeLoanStatus = table.Column<int>(type: "integer", nullable: false),
                    TakeLoanRetries = table.Column<int>(type: "integer", nullable: false),
                    AccountLoanIncomeStatus = table.Column<int>(type: "integer", nullable: false),
                    AccountLoanIncomeRetries = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RequestLoanTransactions", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChargeLoanTransactions");

            migrationBuilder.DropTable(
                name: "RequestLoanTransactions");
        }
    }
}
