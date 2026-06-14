using backend.Domain.Entities;
using backend.Features.Auth.Email;
using backend.Infrastructure.Database;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Stripe;
using Stripe.Checkout;
using backend.Features.Notifications.SendDonationNotifications;

namespace backend.Features.Stripe.StripeWebhook
{
	public class WebhookHandler(
		AthletiqaDbContext db,
		IConfiguration configuration,
		MailpitEmailSender emailSender,
		IMediator mediator
	) : IRequestHandler<WebhookCommand, WebhookResponse>
	{

		public async Task<WebhookResponse> Handle(WebhookCommand command, CancellationToken cancellationToken)
		{
			Event stripeEvent;

			try //Checks if the Stripe-request is correct
			{
				stripeEvent = EventUtility.ConstructEvent(
					command.Json,
					command.Signature,
					configuration["Stripe:WebhookSecret"]);
			}
			catch (StripeException)
			{
				return new WebhookResponse
				{
					Success = false,
					ErrorMessage = "Invalid signature"
				};
			}


			//Completed Checkout Session
			if (stripeEvent.Type == EventTypes.CheckoutSessionCompleted)
			{
				var session = stripeEvent.Data.Object as Session;

				//Prevent duplicate donations if Stripe sends the same event again
				var sessionExist = db.Donation.Any(d => d.StripeSessionId == session.Id);

				if (sessionExist)
				{
					return new WebhookResponse
					{
						Success = true
					};
				}

                var donation = new Donation
                {
                    CampaignId = int.Parse(session.Metadata["campaign_id"]),
                    Amount = session.AmountTotal.Value / 100m, // Stripe sends in ores. Divide by 100 = SEK
                    Status = "succeeded",
                    StripeSessionId = session.Id,
                    SponsorId = session.Metadata.ContainsKey("sponsor_id") ? session.Metadata["sponsor_id"] : null, //if donation by sponsor, add sponsor in donations-table
                    DonorName = session.Metadata["donorName"]



                };

				await db.Donation.AddAsync(donation, cancellationToken);


				var campaign = await db.DonationCampaign
					.Include(c => c.Post) // Include the related Post entity to access AthleteId for notifications
					.FirstOrDefaultAsync(d => d.DonationCampaignId == donation.CampaignId, cancellationToken);

				if (campaign != null)
				{
					campaign.CurrentAmount += donation.Amount;
				}

				await db.SaveChangesAsync(cancellationToken);

				var email = session.Metadata["email"];
				await emailSender.SendDonationReceiptAsync(email, donation.Amount);

				if (campaign != null)
				{
					// Grab the name details if Stripe collected them, fallback to email metadata if empty
					string donorDisplayName = !string.IsNullOrWhiteSpace(session.CustomerDetails?.Name)
						? session.CustomerDetails.Name
						: email;

					await mediator.Publish(new SendDonationNotificationEvent(
						AthleteId: campaign.Post.AthleteId,
						SponsorName: donorDisplayName,
						Amount: donation.Amount,         
						CampaignId: campaign.DonationCampaignId
					), cancellationToken);
				}
			}

			// Expired Checkout Session
			if (stripeEvent.Type == EventTypes.CheckoutSessionExpired) // It now also saves expired donation in database. We can change later if we dont want that.
			{
				var session = stripeEvent.Data.Object as Session;

                var donation = new Donation
                {
                    CampaignId = int.Parse(session.Metadata["campaign_id"]),
                    Amount = session.AmountTotal.Value / 100m, // Stripe sends in ores. Divide by 100 = SEK
                    Status = "expired",
                    StripeSessionId = session.Id,
                    SponsorId = session.Metadata.ContainsKey("sponsor_id") ? session.Metadata["sponsor_id"] : null,
					DonorName = session.Metadata["donorName"]
                };

				await db.Donation.AddAsync(donation, cancellationToken);
				await db.SaveChangesAsync(cancellationToken);
			}

			return new WebhookResponse
			{
				Success = true
			};
		}
	}
}
