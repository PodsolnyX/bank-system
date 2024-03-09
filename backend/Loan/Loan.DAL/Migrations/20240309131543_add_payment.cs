using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Loan.DAL.Migrations
{
    /// <inheritdoc />
    public partial class add_payment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Loans",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedAt",
                table: "Loans",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsClosed",
                table: "Loans",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifiedAt",
                table: "Loans",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Payments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    LoanId = table.Column<Guid>(type: "uuid", nullable: false),
                    CurrentDebt = table.Column<int>(type: "integer", nullable: false),
                    AmountForPay = table.Column<int>(type: "integer", nullable: false),
                    AlreadyPaid = table.Column<int>(type: "integer", nullable: false),
                    IsActual = table.Column<bool>(type: "boolean", nullable: false),
                    PenaltyFee = table.Column<int>(type: "integer", nullable: false),
                    PaidAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Payments_Loans_LoanId",
                        column: x => x.LoanId,
                        principalTable: "Loans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Payments_LoanId",
                table: "Payments",
                column: "LoanId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Payments");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Loans");

            migrationBuilder.DropColumn(
                name: "DeletedAt",
                table: "Loans");

            migrationBuilder.DropColumn(
                name: "IsClosed",
                table: "Loans");

            migrationBuilder.DropColumn(
                name: "ModifiedAt",
                table: "Loans");
        }
    }
}
