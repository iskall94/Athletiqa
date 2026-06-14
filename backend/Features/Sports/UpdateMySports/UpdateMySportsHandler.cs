using backend.Domain.Entities;
using backend.Infrastructure.Database;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Sports.UpdateMySports;

public class UpdateMySportsHandler(
    AthletiqaDbContext db,
    IValidator<UpdateMySportsCommand> validator)
    : IRequestHandler<UpdateMySportsCommand, UpdateMySportsResult>
{
    public async Task<UpdateMySportsResult> Handle(
        UpdateMySportsCommand request,
        CancellationToken cancellationToken)
    {
        var validationResult = await validator.ValidateAsync(request, cancellationToken);

        if (!validationResult.IsValid)
            throw new ValidationException(validationResult.Errors);

        var selectedNames = request.Sports
            .Where(s => !string.IsNullOrWhiteSpace(s))
            .Select(s => s.Trim())
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToList();

        var athlete = await db.AthleteProfile
            .Include(a => a.Sports)
            .FirstOrDefaultAsync(a => a.UserId == request.UserId, cancellationToken);

        if (athlete is null)
            return UpdateMySportsResult.NotAthlete;

        var sports = await db.Sport
            .Where(s => selectedNames.Contains(s.Name))
            .ToListAsync(cancellationToken);

        if (sports.Count != selectedNames.Count)
            return UpdateMySportsResult.InvalidSports;

        db.AthleteSport.RemoveRange(athlete.Sports);

        foreach (var sport in sports)
        {
            athlete.Sports.Add(new AthleteSport
            {
                AthleteId = athlete.UserId,
                SportId = sport.SportId
            });
        }

        athlete.Sport = sports.FirstOrDefault()?.Name;

        await db.SaveChangesAsync(cancellationToken);

        return UpdateMySportsResult.Success;
    }
}
