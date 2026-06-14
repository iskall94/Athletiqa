import { ProgressBar } from "../../../shared/ui/progress";

export function CampaignProgress({ current, goal, showSekFormat = false }) {
  // Calculate percentage with safe division
  const percentage = goal > 0 ? Math.round((current / goal) * 100) : 0;

  // Cap percentage at 100 for display
  const displayPercentage = Math.min(percentage, 100);

  // SEK formatter for currency display
  const sekFormatter = new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
    maximumFractionDigits: 0,
  });

  return (
    <div className="flex flex-col gap-2">
      <ProgressBar percent={displayPercentage} />
      {showSekFormat ? (
        <span>
          {sekFormatter.format(current)} of {sekFormatter.format(goal)} (
          {displayPercentage}%)
        </span>
      ) : (
        <span>{displayPercentage}% Funded</span>
      )}
    </div>
  );
}
