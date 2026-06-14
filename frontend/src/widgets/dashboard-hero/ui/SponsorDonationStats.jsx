import MedalBadge from "../../../enteties/medal/ui/MedalBadge";
import getMedalProgress from "../../../enteties/medal/lib/getMedalProgress";
import { Link } from "react-router-dom";
import { useDonation } from "../../../enteties/medal/hook/useDonation";
import { useTranslation } from "react-i18next";

export default function SponsorDonationStats({ user }) {
  const { t } = useTranslation();
  const { donation } = useDonation();
  console.log("donation:", donation);
  const progress = getMedalProgress(donation?.donationsCount || 0);

  return (
    <article className="mx-auto mt-10 w-full max-w-[50rem] flex flex-col items-center gap-3">

      <section className="w-full flex flex-row gap-5 p-[1rem] items-center">
        <MedalBadge medal={progress.currentMedal} />

        <div className="flex flex-1 flex-col items-center">
          <span className="mt-2 text-sm font-semibold text-primary">
            {progress.currentCount}/{progress.targetCount}
          </span>
          {/*This is progress bar for now but you can change if you want Erik*/}
          <div className="h-1 w-full rounded-full bg-gray-200">
            <div
              className="h-1 rounded-full bg-accent"
              style={{ width: `${Math.min((progress.currentCount / progress.targetCount) * 100, 100)}%` }}
            />
          </div>

          {!progress.hasAnyMedal && (
            <p className="mt-2 text-sm font-semibold text-gray-600">
              {t("Gör din första donation för att låsa upp {{medal}}!", {
                medal: progress.nextMedal?.label,
                defaultValue: "Gör din första donation för att låsa upp {{medal}}!",
              })}
            </p>
          )}

          {progress.hasAnyMedal &&
            !progress.isCompletedAll &&
            progress.nextMedal && (
              <p className="mt-2 text-sm font-semibold text-gray-600">
                {t(
                  "Du har bara {{count}} donationer kvar tills du låser upp {{medal}}!",
                  {
                    count: progress.leftToNext,
                    medal: progress.nextMedal?.label,
                    defaultValue:
                      "Du har bara {{count}} donationer kvar tills du låser upp {{medal}}!",
                  }
                )}
              </p>
            )}

          {progress.isCompletedAll && (
            <p className="mt-2 text-sm font-semibold text-gray-600">
              {t("Du har låst upp alla medaljer!", {
                defaultValue: "Du har låst upp alla medaljer!",
              })}
            </p>
          )}
          
        </div>
        <MedalBadge
          medal={progress.displayMedal}
          locked={progress.isDisplayMedalLocked}
          size="w-25 h-25"
        />
      </section>

      <section className=" w-full flex flex-row justify-evenly">
            <Link
              to="/"
              size="tab"
              className={`transition flex items-center justify-center overflow-hidden
              p-[1rem] px-[1.5rem] rounded-xl  bg-primary text-bg hover:bg-primary-light text-bg`}>{t("Se alla mina medaljer", {
                defaultValue: "Se alla mina medaljer",
              })}</Link>

            <Link
              to="/explore"
              size="tab"
              className={`transition items-center justify-center overflow-hidden
               p-[1rem] px-[1.5rem] rounded-xl bg-accent text-primary hover:bg-accent-light`}>{t("Donera", {
                defaultValue: "Donera",
              })}</Link>
      </section>

    </article>
  );
}
