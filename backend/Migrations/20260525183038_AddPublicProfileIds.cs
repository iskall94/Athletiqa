using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddPublicProfileIds : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PublicProfileId",
                table: "SponsorProfile",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "PublicProfileId",
                table: "AthleteProfile",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.CreateIndex(
                name: "IX_SponsorProfile_PublicProfileId",
                table: "SponsorProfile",
                column: "PublicProfileId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AthleteProfile_PublicProfileId",
                table: "AthleteProfile",
                column: "PublicProfileId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_SponsorProfile_PublicProfileId",
                table: "SponsorProfile");

            migrationBuilder.DropIndex(
                name: "IX_AthleteProfile_PublicProfileId",
                table: "AthleteProfile");

            migrationBuilder.DropColumn(
                name: "PublicProfileId",
                table: "SponsorProfile");

            migrationBuilder.DropColumn(
                name: "PublicProfileId",
                table: "AthleteProfile");
        }
    }
}
