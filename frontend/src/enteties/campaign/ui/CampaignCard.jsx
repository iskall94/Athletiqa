import { useNavigate } from "react-router-dom";
import { Avatar } from "../../../shared/ui/avatar";
import { Button } from "../../../shared/ui/button";
import { ProgressBar } from "../../../shared/ui/progress";
import { ProgressIcon } from "../../../shared/assets";
import { useTranslation } from "react-i18next";

// Horizontal campaign card, image on the left, content on the right.
// Optional `donationAmount`, shows a "Du donerade Xkr" badge on the image.
// Used on the sponsor's profile to show campaigns they've donated to.
export function CampaignCard({ campaign, className = "flex-1" }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Field aliases — accept both backend (athleteName, content) and mock (author, description) shapes
  const title = campaign.title;
  const author = campaign.author ?? campaign.athleteName ?? t("Okänd atlet");
  const age = campaign.age ?? "";
  const description = campaign.description ?? campaign.content;
  const mediaUrl = campaign.mediaUrl ?? "https://placehold.co/265x272";

  // "Remaining" text: handles missing data, completed campaigns, and active ones
  const remainingAmount =
    campaign.goalAmount != null && campaign.currentAmount != null
      ? campaign.goalAmount - campaign.currentAmount
      : null;

  const remaining =
    campaign.remaining ??
    (remainingAmount === null
      ? ""
      : remainingAmount <= 0
        ? t("Mål avklarat!")
        : t("{{count}}kr kvar till målet", { count: remainingAmount, defaultValue: "{{count}}kr kvar till målet" }));

  // Progress percentage (0-100), derived from currentAmount / goalAmount when not provided
  const progress =
    campaign.progress ??
    (campaign.goalAmount
      ? Math.round((campaign.currentAmount / campaign.goalAmount) * 100)
      : 0);

  // Navigate to the campaign details page
  const handleNavigate = () => navigate(`/campaign/${campaign.campaignId}`);

  // Navigate to the athlete who owns this campaign (clicking avatar + name)
  const handleAuthorNavigate = (e) => {
    e.stopPropagation();
    navigate(`/athlete-profile/${campaign.athleteId}`);
  };

  const container = "w-full max-w-[109rem] mx-auto px-[3.25rem]";

  return (
    <article
      className={`${className} p-5 rounded-xl border border-gray-300 bg-surface flex items-stretch gap-5`}
    >
      {/* Image, clicking opens the campaign page. Shows donation badge if applicable. */}
      <Button
        variant="none"
        onClick={handleNavigate}
        className="flex-1 cursor-pointer relative"
      >
        {campaign.donationAmount != null && (
          <span className="absolute top-6 left-1/2 -translate-x-1/2  w-[82.5%] h-[12.5%] bg-white rounded-md text-xl font-medium shadow flex items-center justify-center gap-1">
            {t("Du donerade")} <strong>{campaign.donationAmount}kr</strong>
          </span>
        )}
        <img
          src={mediaUrl}
          alt={t("Campaign Image")}
          className="w-full h-full rounded-lg object-cover"
        />
      </Button>

      {/* Right column, title + author + description (top), progress + button (bottom) */}
      <div className="flex-1 flex flex-col justify-between gap-8 min-w-0">
        {/* Top block, title, author, age, description*/}
        <div className="flex flex-col gap-5">
          <div className="flex items-start gap-4">
            <div className="flex-1 flex flex-col gap-2 min-w-0">
              {/* Title, clicking opens the campaign page */}
              <Button
                variant="none"
                onClick={handleNavigate}
                className="!p-0 !rounded-none text-left hover:underline"
              >
                <h3 className="text-2xl font-bold text-primary leading-7">
                  {title}
                </h3>
              </Button>

              {/* Author, clicking navigates to their profile */}
              <Button
                variant="none"
                onClick={handleAuthorNavigate}
                className="!p-0 !rounded-none flex items-center gap-2 hover:underline w-fit"
              >
                <Avatar
                  src={campaign.athletePhotoUrl}
                  alt={author}
                  size="s"
                  fallback={campaign.athleteGender}
                />
                <span className="text-base text-gray-700 leading-6">
                  {author}
                </span>
              </Button>
            </div>

            <span className="text-sm text-gray-500 text-right leading-5">
              {age}
            </span>
          </div>

          {/* Description, clicking also opens the campaign page */}
          <Button
            variant="none"
            onClick={handleNavigate}
            className="!p-0 !rounded-none text-left hover:underline"
          >
            <p className="text-base text-gray-700 leading-6 line-clamp-3">
              {description}
            </p>
          </Button>
        </div>

        {/* Bottom block, remaining + progress bar + CTA button */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                {remaining}
              </span>
              <span className="text-sm">
                <ProgressIcon />
              </span>
            </div>
            <ProgressBar percent={progress} />
          </div>

          <Button
            className="w-full px-8 py-3 rounded-xl text-xl font-semibold"
            onClick={(e) => {
              e.stopPropagation();
              handleNavigate();
            }}
          >
            {t("Läs mer")}
          </Button>
        </div>
      </div>
    </article>
  );
}

/* Outdated component, saved in case it still needs to be used.
export function CampaignCard({ campaign }) {
    const navigate = useNavigate();

    const handleNavigate = () => {
        // This sends the user to /campaign/1 (or whatever the ID is)
        navigate(`/campaign/${campaign.campaignId}`);
    };

    return (
        <article className="campaign-card" onClick={handleNavigate} >
            <div className="campaign-card__visual">
                <img src={campaign.mediaUrl} alt={campaign.title} />
            </div>
            <div className="campaign-card__details">
                <h2>{campaign.title}</h2>
                <p>{campaign.athleteName}</p>

                <CampaignProgress
                    current={campaign.currentAmount}
                    goal={campaign.goalAmount}
                />
                <Button onClick={(e) => {
                    e.stopPropagation();
                    handleNavigate();
                }}>
                    Donate
                </Button>
            </div>
        </article>
    );
}
*/