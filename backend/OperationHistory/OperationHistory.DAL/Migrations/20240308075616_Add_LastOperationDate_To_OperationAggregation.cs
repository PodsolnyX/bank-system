using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OperationHistory.DAL.Migrations
{
    /// <inheritdoc />
    public partial class Add_LastOperationDate_To_OperationAggregation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LoanId",
                table: "OperationAggregations");

            migrationBuilder.AddColumn<DateTime>(
                name: "LastOperationDate",
                table: "OperationAggregations",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastOperationDate",
                table: "OperationAggregations");

            migrationBuilder.AddColumn<Guid>(
                name: "LoanId",
                table: "OperationAggregations",
                type: "uuid",
                nullable: true);
        }
    }
}
