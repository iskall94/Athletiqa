using backend.Domain.Enums;
using backend.Features.Settings.ProfileSettings.UpdateAthlete;
using backend.Infrastructure.Database;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Settings.ProfileSettings.UpdateSponsor
{
    public class UpdateSponsorProfileHandler : IRequestHandler<UpdateSponsorProfileCommand, UpdateSponsorProfileResponse>
    {
        private readonly AthletiqaDbContext _context;
        private readonly IValidator<UpdateSponsorProfileCommand> _validator;

        public UpdateSponsorProfileHandler
            (
            AthletiqaDbContext context,
            IValidator<UpdateSponsorProfileCommand> validator
            )

        {
            _context = context;
            _validator = validator;
        }

        public async Task<UpdateSponsorProfileResponse> Handle(UpdateSponsorProfileCommand request, CancellationToken cancellationToken)
        {
            var validationResult = await _validator.ValidateAsync(request, cancellationToken);
            if (!validationResult.IsValid)
            {
                return new UpdateSponsorProfileResponse
                {
                    Success = false,
                    Errors = validationResult.Errors.Select(e => e.ErrorMessage).ToList()
                };
            }

            var sponsor = await _context.AppUsers
                                        .Include(a => a.AspNetUser)
                                        .Include(a => a.SponsorProfile)
                                        .FirstOrDefaultAsync(a => a.UserId == request.UserId, cancellationToken);

            if (sponsor == null || sponsor.AspNetUser == null || sponsor.SponsorProfile == null)
            {
                return new UpdateSponsorProfileResponse
                {
                    Success = false,
                    ErrorMessage = "User not found"
                };
            }

            if (!string.IsNullOrEmpty(request.FirstName)) sponsor.AspNetUser.FirstName = request.FirstName;
            if (!string.IsNullOrEmpty(request.LastName)) sponsor.AspNetUser.LastName = request.LastName;

            //allows Description to be empty
            if (request.Description != null)
            {
                sponsor.SponsorProfile.Description = request.Description;
            }


            if (!string.IsNullOrEmpty(request.Email))
            {
                sponsor.AspNetUser.Email = request.Email;
                sponsor.AspNetUser.NormalizedEmail = request.Email.ToUpperInvariant();

                //userName for Identity
                sponsor.AspNetUser.UserName = request.Email;
                sponsor.AspNetUser.NormalizedUserName = request.Email.ToUpperInvariant();
            }

            Console.WriteLine(sponsor.SponsorProfile.SponsorTypeId);
            if (sponsor.SponsorProfile.SponsorTypeId == SponsorCategory.Company)
            {
                if (string.IsNullOrWhiteSpace(request.CompanyName))
                {
                    return new UpdateSponsorProfileResponse
                    {
                        Success = false,
                        ErrorMessage = "Company name is required for company sponsors"
                    };
                }

                if (string.IsNullOrWhiteSpace(request.OrgNumber))
                {
                    return new UpdateSponsorProfileResponse
                    {
                        Success = false,
                        ErrorMessage = "Organisation number is required for company sponsors"
                    };
                }

                sponsor.SponsorProfile.Name = request.CompanyName;
                sponsor.SponsorProfile.OrganisationNumber = request.OrgNumber;
            }

            if (request.PhotoUrl != null)
            {
                sponsor.SponsorProfile.PhotoUrl = request.PhotoUrl;
            }

            if (request.PhotoPublicId != null)
            {
                sponsor.SponsorProfile.PhotoPublicId = request.PhotoPublicId;
            }

            await _context.SaveChangesAsync(cancellationToken);

            return new UpdateSponsorProfileResponse
            {
                Success = true
            };
        }
    }
}
