using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Arbiter.DAL.Migrations
{
    /// <inheritdoc />
    public partial class add_breaker : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "IdempotenceKey",
                table: "RequestLoanTransactions",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "IdempotenceKey",
                table: "ChargeLoanTransactions",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "CircuitBreaker",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CoreTimeout = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LoanTimeout = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CircuitBreaker", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "CircuitBreaker",
                columns: new[] { "Id", "CoreTimeout", "LoanTimeout" },
                values: new object[] { new Guid("58e2e618-a421-4efa-b850-41b7e174ebc1"), null, null });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CircuitBreaker");

            migrationBuilder.DropColumn(
                name: "IdempotenceKey",
                table: "RequestLoanTransactions");

            migrationBuilder.DropColumn(
                name: "IdempotenceKey",
                table: "ChargeLoanTransactions");
        }
    }
}
