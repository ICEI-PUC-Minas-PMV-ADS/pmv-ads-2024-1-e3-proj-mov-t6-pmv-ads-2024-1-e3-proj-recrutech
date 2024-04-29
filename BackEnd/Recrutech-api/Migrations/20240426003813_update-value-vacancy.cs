using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Recrutech_api.Migrations
{
    public partial class updatevaluevacancy : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<float>(
                name: "Remuneration",
                table: "Vacancies",
                type: "real",
                nullable: false,
                defaultValue: 0f,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Remuneration",
                table: "Vacancies",
                type: "text",
                nullable: true,
                oldClrType: typeof(float),
                oldType: "real");
        }
    }
}
