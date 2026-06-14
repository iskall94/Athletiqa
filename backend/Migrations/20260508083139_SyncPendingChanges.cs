using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class SyncPendingChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Message",
                keyColumn: "MessageId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Message",
                keyColumn: "MessageId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Message",
                keyColumn: "MessageId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "NotificationSetting",
                keyColumn: "UserId",
                keyValue: "11111111-aaaa-1111-aaaa-111111111111");

            migrationBuilder.DeleteData(
                table: "NotificationSetting",
                keyColumn: "UserId",
                keyValue: "22222222-bbbb-2222-bbbb-222222222222");

            migrationBuilder.DeleteData(
                table: "PrivacySetting",
                keyColumn: "UserId",
                keyValue: "11111111-aaaa-1111-aaaa-111111111111");

            migrationBuilder.DeleteData(
                table: "PrivacySetting",
                keyColumn: "UserId",
                keyValue: "22222222-bbbb-2222-bbbb-222222222222");

            migrationBuilder.DeleteData(
                table: "AppUsers",
                keyColumn: "UserId",
                keyValue: "11111111-aaaa-1111-aaaa-111111111111");

            migrationBuilder.DeleteData(
                table: "AppUsers",
                keyColumn: "UserId",
                keyValue: "22222222-bbbb-2222-bbbb-222222222222");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "11111111-aaaa-1111-aaaa-111111111111");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "22222222-bbbb-2222-bbbb-222222222222");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "CreatedAt", "Email", "EmailConfirmed", "FirstName", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PersonalIdNumber", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "StripeAccountId", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "11111111-aaaa-1111-aaaa-111111111111", 0, "STATIC_CONCURRENCY_STAMP_1", new DateTime(2026, 4, 24, 6, 51, 14, 894, DateTimeKind.Utc).AddTicks(8336), "ivan@test.com", true, "", "", false, null, "IVAN@TEST.COM", "IVAN@TEST.COM", "STATIC_PASSWORD_HASH_1", "", null, false, "STATIC_SECURITY_STAMP_1", null, false, "ivan@test.com" },
                    { "22222222-bbbb-2222-bbbb-222222222222", 0, "STATIC_CONCURRENCY_STAMP_2", new DateTime(2026, 4, 24, 6, 51, 14, 895, DateTimeKind.Utc).AddTicks(3683), "anna@test.com", true, "", "", false, null, "ANNA@TEST.COM", "ANNA@TEST.COM", "STATIC_PASSWORD_HASH_2", "", null, false, "STATIC_SECURITY_STAMP_2", null, false, "anna@test.com" }
                });

            migrationBuilder.InsertData(
                table: "AppUsers",
                column: "UserId",
                values: new object[]
                {
                    "11111111-aaaa-1111-aaaa-111111111111",
                    "22222222-bbbb-2222-bbbb-222222222222"
                });

            migrationBuilder.InsertData(
                table: "Message",
                columns: new[] { "MessageId", "Content", "ConversationId", "SenderId", "TimeStamp" },
                values: new object[,]
                {
                    { 1, "Hey Anna!", 1, "11111111-aaaa-1111-aaaa-111111111111", new DateTime(2026, 4, 24, 6, 51, 14, 896, DateTimeKind.Utc).AddTicks(6349) },
                    { 2, "Hi Ivan! How are you?", 1, "22222222-bbbb-2222-bbbb-222222222222", new DateTime(2026, 4, 24, 6, 51, 14, 896, DateTimeKind.Utc).AddTicks(6628) },
                    { 3, "I'm testing the chat feature.", 1, "11111111-aaaa-1111-aaaa-111111111111", new DateTime(2026, 4, 24, 6, 51, 14, 896, DateTimeKind.Utc).AddTicks(6629) }
                });

            migrationBuilder.InsertData(
                table: "NotificationSetting",
                columns: new[] { "UserId", "DonationAlerts", "EmailNotification", "MessageAlerts", "PostAlerts" },
                values: new object[,]
                {
                    { "11111111-aaaa-1111-aaaa-111111111111", false, false, false, false },
                    { "22222222-bbbb-2222-bbbb-222222222222", false, false, false, false }
                });

            migrationBuilder.InsertData(
                table: "PrivacySetting",
                columns: new[] { "UserId", "AnonymousDonations", "PublicProfile", "ShowInSearch" },
                values: new object[,]
                {
                    { "11111111-aaaa-1111-aaaa-111111111111", false, false, false },
                    { "22222222-bbbb-2222-bbbb-222222222222", false, false, false }
                });
        }
    }
}
