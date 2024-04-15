using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Recrutech_api.Migrations
{
    public partial class newt3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserVacancy");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Vacancies",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Vacancies_UserId",
                table: "Vacancies",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Vacancies_Users_UserId",
                table: "Vacancies",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vacancies_Users_UserId",
                table: "Vacancies");

            migrationBuilder.DropIndex(
                name: "IX_Vacancies_UserId",
                table: "Vacancies");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Vacancies");

            migrationBuilder.CreateTable(
                name: "UserVacancy",
                columns: table => new
                {
                    UsersId = table.Column<int>(type: "integer", nullable: false),
                    VacanciesOwnerId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserVacancy", x => new { x.UsersId, x.VacanciesOwnerId });
                    table.ForeignKey(
                        name: "FK_UserVacancy_Users_UsersId",
                        column: x => x.UsersId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserVacancy_Vacancies_VacanciesOwnerId",
                        column: x => x.VacanciesOwnerId,
                        principalTable: "Vacancies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserVacancy_VacanciesOwnerId",
                table: "UserVacancy",
                column: "VacanciesOwnerId");
        }
    }
}
