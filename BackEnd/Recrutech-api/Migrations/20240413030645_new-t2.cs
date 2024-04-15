using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Recrutech_api.Migrations
{
    public partial class newt2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserVacancy_Vacancies_VacanciesId",
                table: "UserVacancy");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserRecomendations",
                table: "UserRecomendations");

            migrationBuilder.RenameColumn(
                name: "VacanciesId",
                table: "UserVacancy",
                newName: "VacanciesOwnerId");

            migrationBuilder.RenameIndex(
                name: "IX_UserVacancy_VacanciesId",
                table: "UserVacancy",
                newName: "IX_UserVacancy_VacanciesOwnerId");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "UserRecomendations",
                type: "integer",
                nullable: false,
                defaultValue: 0)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserRecomendations",
                table: "UserRecomendations",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_UserRecomendations_RecommendationId",
                table: "UserRecomendations",
                column: "RecommendationId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserVacancy_Vacancies_VacanciesOwnerId",
                table: "UserVacancy",
                column: "VacanciesOwnerId",
                principalTable: "Vacancies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserVacancy_Vacancies_VacanciesOwnerId",
                table: "UserVacancy");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserRecomendations",
                table: "UserRecomendations");

            migrationBuilder.DropIndex(
                name: "IX_UserRecomendations_RecommendationId",
                table: "UserRecomendations");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "UserRecomendations");

            migrationBuilder.RenameColumn(
                name: "VacanciesOwnerId",
                table: "UserVacancy",
                newName: "VacanciesId");

            migrationBuilder.RenameIndex(
                name: "IX_UserVacancy_VacanciesOwnerId",
                table: "UserVacancy",
                newName: "IX_UserVacancy_VacanciesId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserRecomendations",
                table: "UserRecomendations",
                columns: new[] { "RecommendationId", "UserId" });

            migrationBuilder.AddForeignKey(
                name: "FK_UserVacancy_Vacancies_VacanciesId",
                table: "UserVacancy",
                column: "VacanciesId",
                principalTable: "Vacancies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
