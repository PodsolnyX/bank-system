using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Loan.DAL.Migrations
{
    /// <inheritdoc />
    public partial class fix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Loans_TariffId",
                table: "Loans",
                column: "TariffId");

            migrationBuilder.AddForeignKey(
                name: "FK_Loans_Tariffs_TariffId",
                table: "Loans",
                column: "TariffId",
                principalTable: "Tariffs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Loans_Tariffs_TariffId",
                table: "Loans");

            migrationBuilder.DropIndex(
                name: "IX_Loans_TariffId",
                table: "Loans");
        }
    }
}
