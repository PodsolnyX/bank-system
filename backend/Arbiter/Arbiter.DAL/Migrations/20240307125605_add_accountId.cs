using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Arbiter.DAL.Migrations
{
    /// <inheritdoc />
    public partial class add_accountId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "LoanId",
                table: "RequestLoanTransactions",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "LoanId",
                table: "ChargeLoanTransactions",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LoanId",
                table: "RequestLoanTransactions");

            migrationBuilder.DropColumn(
                name: "LoanId",
                table: "ChargeLoanTransactions");
        }
    }
}
