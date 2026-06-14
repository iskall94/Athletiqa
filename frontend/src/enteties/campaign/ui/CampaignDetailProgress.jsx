export function CampaignDetailProgress({ current, goal, showSekFormat = false }) {
    // Calculate percentage with safe division
    const percentage = goal > 0
        ? Math.round((current / goal) * 100)
        : 0;


    // Cap percentage at 100 for display

  const displayPercentage = Math.min(percentage, 100);

  // SEK formatter for currency display
  const sekFormatter = new Intl.NumberFormat("sv-SE", {
        style: "currency",
        currency: "SEK",
        maximumFractionDigits: 0
    });

        return (
        <div className="progress-container">
            {showSekFormat ? (
                <div className="flex items-baseline justify-between">
                    <div className="flex flex-row gap-2 items-baseline">
                        <span className="font-bold text-[1.5rem]">
                        {sekFormatter.format(current)} insamlat
                        </span>
                        <span>av {sekFormatter.format(goal)}</span>
                    </div>


                    <span className="font-semibold">{displayPercentage}%</span>
                </div>
            ) : (
                <span>{displayPercentage}% Funded</span>
            )}
        </div>
    );
}
