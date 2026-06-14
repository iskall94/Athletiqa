using System.ComponentModel.DataAnnotations;
using System.Reflection;
using backend.Domain.Enums;

namespace backend.Shared.Helpers;

public static class SportTypeExtensions
{
    public static string GetDisplayName(this SportType sport)
    {
    var member = typeof(SportType).GetMember(sport.ToString()).FirstOrDefault();
    var display = member?.GetCustomAttribute<DisplayAttribute>();

    return display?.Name ?? sport.ToString();
    }
}
