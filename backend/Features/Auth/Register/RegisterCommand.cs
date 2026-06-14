using MediatR;
using backend.Domain.Enums;

namespace backend.Features.Auth.Register;

public record RegisterCommand : IRequest<RegisterResult>
{
    public required string Email { get; init; }
    public required string Password { get; init; }
    public required string PersonalIdNumber { get; init; }
    public required string FirstName { get; init; }
    public required string LastName { get; init; }
    public required UserType UserType { get; init; }
    public required string PhoneNumber { get; init; }

    // Athlete-specific fields
    public Gender? Gender { get; init; }
    public string? Sport { get; init; }
    public string? Bio { get; init; }
    public string? DreamGoal { get; init; }

    // Sponsor-specific fields
    public string? Name { get; init; }
    public string? OrganisationNumber { get; init; }
    public string? Description { get; init; }
    public SponsorCategory? SponsorTypeId { get; init; }

    // Guardian field (for minors)
    public GuardianInfo? Guardian { get; init; }
}

public record GuardianInfo
{
    public required string FirstName { get; init; }
    public required string LastName { get; init; }
    public required string Email { get; init; }
    public required string PhoneNumber { get; init; }
    public required GuardianRelationship Relationship { get; init; }
    public required string PersonalIdNumber { get; init; }
}

public record RegisterResult
{
    public bool Success { get; init; }
    public string? UserId { get; init; }
    public string? ErrorMessage { get; init; }
    public List<string>? Errors { get; init; }
}