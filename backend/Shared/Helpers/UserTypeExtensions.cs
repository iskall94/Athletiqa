namespace backend.Domain.Enums;

public static class UserTypeExtensions
{
    public static bool IsAthlete(this UserType userType)
    {
        return userType == UserType.Athlete;
    }

    public static bool IsSponsor(this UserType userType)
    {
        return userType == UserType.SponsorUser || userType == UserType.SponsorCompanyUser;
    }

    public static bool IsSponsorUser(this UserType userType)
    {
        return userType == UserType.SponsorUser;
    }

    public static bool IsSponsorCompanyUser(this UserType userType)
    {
        return userType == UserType.SponsorCompanyUser;
    }
}