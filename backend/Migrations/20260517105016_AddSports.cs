using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddSports : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Sport",
                columns: table => new
                {
                    SportId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sport", x => x.SportId);
                });

            migrationBuilder.CreateTable(
                name: "AthleteSport",
                columns: table => new
                {
                    AthleteId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    SportId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AthleteSport", x => new { x.AthleteId, x.SportId });
                    table.ForeignKey(
                        name: "FK_AthleteSport_AthleteProfile_AthleteId",
                        column: x => x.AthleteId,
                        principalTable: "AthleteProfile",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AthleteSport_Sport_SportId",
                        column: x => x.SportId,
                        principalTable: "Sport",
                        principalColumn: "SportId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Sport",
                columns: new[] { "SportId", "Name" },
                values: new object[,]
                {
                    { 1, "Fotboll" },
                    { 2, "Innebandy" },
                    { 3, "Ishockey" },
                    { 4, "Ridsport" },
                    { 5, "Gymnastik" },
                    { 6, "Handboll" },
                    { 7, "Friidrott" },
                    { 8, "Simning" },
                    { 9, "Basket" },
                    { 10, "Volleyboll" },
                    { 11, "Längdskidåkning" },
                    { 12, "Alpint (Skidor)" },
                    { 13, "Bordtennis" },
                    { 14, "Badminton" },
                    { 15, "Bandy" },
                    { 16, "Dans" },
                    { 17, "Tennis" },
                    { 18, "Konstsim" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AthleteSport_SportId",
                table: "AthleteSport",
                column: "SportId");

            migrationBuilder.CreateIndex(
                name: "IX_Sport_Name",
                table: "Sport",
                column: "Name",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AthleteSport");

            migrationBuilder.DropTable(
                name: "Sport");
        }
    }
}
