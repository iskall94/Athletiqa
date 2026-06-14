namespace backend.Shared.Helpers;

public static class PersonNumberHelper
{
    /// <summary>
    /// Validates a Swedish personal ID number (personnummer)
    /// Format: YYYYMMDD-XXXX or YYYYMMDDXXXX
    /// </summary>
    public static bool IsValid(string personalIdNumber)
    {
        if (string.IsNullOrWhiteSpace(personalIdNumber))
            return false;

        var cleanNumber = Normalize(personalIdNumber);

        if (cleanNumber.Length != 12 || !cleanNumber.All(char.IsDigit))
            return false;

        var (year, month, day) = ParseCleanNumber(cleanNumber);

        if (!IsValidDate(year, month, day))
            return false;

        var last10Digits = cleanNumber.Substring(2, 10);
        return ValidateLuhnChecksum(last10Digits);
    }

    /// <summary>
    /// Checks if the person is a minor (under 18 years old)
    /// </summary>
    public static bool IsMinor(this string personalIdNumber)
    {
        return GetAge(personalIdNumber) < 18;
    }

    /// <summary>
    /// Checks if the person is an adult (18 years or older)
    /// </summary>
    public static bool IsAdult(this string personalIdNumber)
    {
        return GetAge(personalIdNumber) >= 18;
    }

    /// <summary>
    /// Calculates age from Swedish personal ID number
    /// </summary>
    public static int GetAge(string personalIdNumber)
    {
        var birthDate = GetDateOfBirth(personalIdNumber);
        return birthDate.HasValue ? CalculateAge(birthDate.Value) : 0;
    }

    /// <summary>
    /// Gets the date of birth from a personal ID number
    /// </summary>
    public static DateTime? GetDateOfBirth(string personalIdNumber)
    {
        if (!IsValid(personalIdNumber))
            return null;

        var (year, month, day) = ParseCleanNumber(Normalize(personalIdNumber));
        return new DateTime(year, month, day);
    }

    private static string Normalize(string personalIdNumber)
        => personalIdNumber.Replace("-", "").Replace(" ", "");

    private static (int year, int month, int day) ParseCleanNumber(string cleanNumber)
        => (
            int.Parse(cleanNumber.Substring(0, 4)),
            int.Parse(cleanNumber.Substring(4, 2)),
            int.Parse(cleanNumber.Substring(6, 2))
        );

    private static int CalculateAge(DateTime dateOfBirth)
    {
        var today = DateTime.UtcNow;
        var age = today.Year - dateOfBirth.Year;
        if (dateOfBirth.Date > today.AddYears(-age))
            age--;
        return age;
    }

    private static bool IsValidDate(int year, int month, int day)
    {
        if (year < 1900 || year > DateTime.UtcNow.Year)
            return false;

        if (month < 1 || month > 12)
            return false;

        if (day < 1 || day > DateTime.DaysInMonth(year, month))
            return false;

        var date = new DateTime(year, month, day);
        return date <= DateTime.UtcNow;
    }

    private static bool ValidateLuhnChecksum(string number)
    {
        var sum = 0;

        for (var i = number.Length - 1; i >= 0; i--)
        {
            var digit = int.Parse(number[i].ToString());

            if (i % 2 == 0)
            {
                digit *= 2;
                if (digit > 9)
                    digit -= 9;
            }

            sum += digit;
        }

        return sum % 10 == 0;
    }
}