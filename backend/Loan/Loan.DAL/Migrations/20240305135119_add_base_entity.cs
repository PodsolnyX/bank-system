using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Loan.DAL.Migrations
{
    /// <inheritdoc />
    public partial class add_base_entity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedAt",
                table: "Tariffs",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ModifiedAt",
                table: "Tariffs",
                type: "timestamp with time zone",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeletedAt",
                table: "Tariffs");

            migrationBuilder.DropColumn(
                name: "ModifiedAt",
                table: "Tariffs");
        }
    }
}
