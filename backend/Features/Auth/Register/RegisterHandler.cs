using MediatR;
using backend.Domain.Entities;
using backend.Infrastructure.Database;
using Microsoft.AspNetCore.Identity;
using backend.Shared.Helpers;
using FluentValidation;
using backend.Domain.Enums;
using backend.Shared.Constants;
using backend.Features.Auth.Email.EmailVerification;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Auth.Register;

public class RegisterHandler(
    UserManager<ApplicationUser> userManager,
    AthletiqaDbContext context,
    IValidator<RegisterCommand> validator,
    IMediator mediator
    ) : IRequestHandler<RegisterCommand, RegisterResult>
{
    public async Task<RegisterResult> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        var strategy = context.Database.CreateExecutionStrategy();

        var validationResult = await validator.ValidateAsync(request, cancellationToken);
        if (!validationResult.IsValid)
        {
            return new RegisterResult
            {
                Success = false,
                Errors = validationResult.Errors.Select(e => e.ErrorMessage).ToList()
            };
        }

        var registrationResult = await strategy.ExecuteAsync(async (ct) =>
        {

            await using var transaction = await context.Database.BeginTransactionAsync(ct);
            ApplicationUser? aspNetUser = null;

            try
            {

                // 1. Create Identity User
                var identityUser = new ApplicationUser
                {
                    UserName = request.Email,
                    Email = request.Email,
                    PhoneNumber = request.PhoneNumber,
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    PersonalIdNumber = request.PersonalIdNumber
                };
                aspNetUser = identityUser;

                var result = await userManager.CreateAsync(identityUser, request.Password);
                if (!result.Succeeded)
                {
                    await transaction.RollbackAsync(ct);

                    return new RegisterResult
                    {
                        Success = false,
                        UserId = string.Empty,
                        ErrorMessage = "Failed to create identity user",
                        Errors = result.Errors.Select(e => e.Description).ToList()
                    };
                }

                // 2. Create User
                var user = new User
                {
                    UserId = identityUser.Id
                };

                context.AppUsers.Add(user);
                await context.SaveChangesAsync(ct);

                // 3. Create Profile based on UserType
                if (request.UserType == UserType.Athlete)
                {
                    var DateOfBirth = PersonNumberHelper.GetDateOfBirth(request.PersonalIdNumber)!.Value;

                    Guardian? guardian = null;

                    if (PersonNumberHelper.IsMinor(request.PersonalIdNumber) && request.Guardian != null)
                    {
                        guardian = new Guardian
                        {
                            GuardianId = Guid.NewGuid().ToString(),
                            FirstName = request.Guardian.FirstName,
                            LastName = request.Guardian.LastName,
                            Email = request.Guardian.Email,
                            PhoneNumber = request.Guardian.PhoneNumber,
                            PersonalIdNumber = request.Guardian.PersonalIdNumber,
                            Relationship = request.Guardian.Relationship,
                        };

                        context.Set<Guardian>().Add(guardian);
                    }

                    context.AthleteProfile.Add(new AthleteProfile
                    {
                        User = user,
                        UserId = user.UserId,
                        DateOfBirth = DateOfBirth,
                        Gender = request.Gender!.Value,
                        Bio = request.Bio,
                        Sport = request.Sport!,
                        DreamGoal = request.DreamGoal,
                        GuardianId = guardian?.GuardianId
                    });

                }
                else
                {
                    context.SponsorProfile.Add(new SponsorProfile
                    {
                        User = user,
                        UserId = user.UserId,
                        Name = request.Name!,
                        OrganisationNumber = request.OrganisationNumber!,
                        SponsorTypeId = request.SponsorTypeId!.Value,
                        Description = request.Description
                    });
                }

                await context.SaveChangesAsync(ct);

                // Uses reflection to automatically map all roles(Identity) to usertype(Enum)
                var roleName = typeof(Roles)
                    .GetField(request.UserType.ToString(), System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static)
                    ?.GetRawConstantValue() as string
                    ?? throw new InvalidOperationException($"No role mapped for UserType: {request.UserType}");
                await userManager.AddToRoleAsync(identityUser, roleName);

                await transaction.CommitAsync(ct);

                return new RegisterResult
                {
                    Success = true,
                    UserId = user.UserId
                };
            }
            catch
            {
                await transaction.RollbackAsync(ct);

                if (aspNetUser != null)
                {
                    await userManager.DeleteAsync(aspNetUser);

                }

                throw;
            }
        }, cancellationToken);

        if (registrationResult.Success)
        {
            await mediator.Send(new VerificationEmailCommand(request.Email), cancellationToken);
        }

        return registrationResult;
    }
}