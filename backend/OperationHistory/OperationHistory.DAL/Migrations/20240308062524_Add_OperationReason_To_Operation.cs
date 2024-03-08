using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OperationHistory.DAL.Migrations
{
    /// <inheritdoc />
    public partial class Add_OperationReason_To_Operation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateTime",
                table: "Operations");

            migrationBuilder.AlterColumn<string>(
                name: "Message",
                table: "Operations",
                type: "character varying(250)",
                maxLength: 250,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Reason",
                table: "Operations",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<Guid>(
                name: "TransactionId",
                table: "Operations",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Reason",
                table: "Operations");

            migrationBuilder.DropColumn(
                name: "TransactionId",
                table: "Operations");

            migrationBuilder.AlterColumn<string>(
                name: "Message",
                table: "Operations",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(250)",
                oldMaxLength: 250,
                oldNullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateTime",
                table: "Operations",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
