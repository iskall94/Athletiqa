import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CampaignCard } from "../../../enteties/campaign";
import { StatCard } from "../../../widgets/athlete-profile-header";
import { Avatar } from "../../../shared/ui/avatar";
import { Button } from "../../../shared/ui/button";
import { Chip } from "../../../shared/ui/chip";
import { Tabs } from "../../../shared/ui/tabs";

// Sponsor's own profile view (the logged-in sponsor).
// Two tabs, Insamlingar (donations made) and Mina medaljer (badges earned).
// Mirrors the athlete profile layout, just with different content per tab.
export default function LoggedInSponsorProfile({
  container,
  sponsor,
  medals,
  activeDonations,
  finishedDonations,
}) {
  // Active tab toggle, "campaigns" or "medals"
  const [activeTab, setActiveTab] = useState("campaigns");
  const { t } = useTranslation();

  // Medal progress, used to drive the bar at the top of the medals tab.
  const unlockedCount = medals.filter((m) => m.unlocked).length;
  const nextMedal = medals.find((m) => !m.unlocked);
  const remainingToNext = nextMedal ? nextMedal.threshold - unlockedCount : 0;
  const highestUnlockedMedal = medals.filter((medal) => medal.unlocked).at(-1);

  return (
    <>
      {/* Top section, avatar + name + sponsor badge + sports + bio + follower count */}
      <section
        className={`${container} pt-8 pb-12 flex items-start justify-between gap-8`}
      >
        <div className="flex items-start gap-6 flex-1 min-w-0">
          <Avatar
            src={sponsor.photoUrl}
            alt={sponsor.name}
            size="xl"
            fallback="company"
            className="!w-44 !h-44 flex-shrink-0"
          />

          <div className="flex-1 min-w-0 flex flex-col gap-6">
            {/* Name + sponsor badge + public chip */}
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-xl text-primary">{sponsor.name}</h1>
              {highestUnlockedMedal ? (
                <img
                  src={highestUnlockedMedal.iconUrl}
                  alt={highestUnlockedMedal.name}
                  className="w-8 h-8 rounded-full"
                />
              ) : null}
              <Chip className="!border-primary !text-primary">Public</Chip>
            </div>

            {/* Sport chips */}
            <div className="flex gap-3 flex-wrap">
              {sponsor.sports.map((sport) => (
                <Chip key={sport}>{sport}</Chip>
              ))}
            </div>

            {/* Description */}
            {sponsor.description ? (
              <p className="text-sm text-gray-700">{sponsor.description}</p>
            ) : null}
          </div>
        </div>

        {/* Follower stat sitting to the right */}
        <aside className="w-[17.75rem] flex gap-3 flex-shrink-0">
          <StatCard value={sponsor.followers} label={t("Följer")} />
        </aside>
      </section>

      {/* Divider line under the profile section */}
      <div className={`${container} flex-shrink-0`}>
        <div className="h-px bg-gray-300" />
      </div>

      {/* Tab switcher */}
      <div
        className={`${container} pt-6 pb-10 flex items-center justify-center gap-6`}
      >
        <Tabs
          active={activeTab}
          onChange={setActiveTab}
          items={[
            { id: "campaigns", label: t("Insamlingar") },
            { id: "medals", label: t("Mina medaljer") },
          ]}
          className="w-96"
          itemClassName="flex-1 px-8 py-4 text-base"
        />
      </div>

      {/* Campaigns tab, shows donations the sponsor has made */}
      {activeTab === "campaigns" && (
        <>
          {activeDonations.length > 0 && (
            <section className={`${container} pb-12 flex flex-col gap-6`}>
              <h2 className="text-3xl font-semibold text-primary leading-9">
                {t("Dina aktiva insamlingar")}
              </h2>
              <div className="grid grid-cols-2 gap-6">
                {/* Onboarding card, encourages the user to support more athletes */}
                <article className="rounded-xl border border-dashed border-gray-300 p-10 flex flex-col items-center justify-center gap-6 text-center min-h-[19.5rem]">
                  <h3 className="text-primary text-2xl font-semibold">
                    {t("Vill du stötta fler atleter?")}
                  </h3>
                  <p className="text-base text-gray-700">
                    {t("Utforska och hitta fler talanger som du kan hjälpa vidare i deras idrottsresa.")}
                  </p>
                  <Button variant="primary" className="px-8 py-3 rounded-xl">
                    {t("Utforska")}
                  </Button>
                </article>

                {/* Active donations grid */}
                {activeDonations.map((d) => (
                  <CampaignCard
                    key={d.donationId}
                    campaign={{ ...d.campaign, donationAmount: d.amount }}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Finished donations grid */}
          {finishedDonations.length > 0 && (
            <section className={`${container} pb-16 flex flex-col gap-6`}>
              <h2 className="text-3xl font-semibold leading-9">
                <span className="text-gray-700">{t("Dina färdiga insamlingar")}</span>
                <span className="text-primary">
                  {" "}
                  - {finishedDonations.length}st
                </span>
              </h2>
              <div className="grid grid-cols-2 gap-6">
                {finishedDonations.map((d) => (
                  <CampaignCard
                    key={d.donationId}
                    campaign={{ ...d.campaign, donationAmount: d.amount }}
                  />
                ))}
              </div>
            </section>
          )}
        </>
      )}

      {/* Medals tab, shows progress to next badge + the full list */}
      {activeTab === "medals" && (
        <>
          {/* Progress bar from current medal to the next, with hint text below */}
          <section
            className={`${container} pb-8 flex flex-col items-center gap-4`}
          >
            <div className="w-full max-w-[60rem] flex items-center gap-4">
              {/* Last earned medal icon */}
              <img
                src={medals[0].iconUrl}
                alt=""
                className="w-16 h-16 rounded-full"
              />

              {/* Numeric count + bar */}
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex justify-center">
                  <span className="text-lg">
                    <strong>{unlockedCount}</strong> /{" "}
                    {nextMedal?.threshold ?? 5}
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-accent-light overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full"
                    style={{
                      width: `${
                        nextMedal
                          ? Math.round(
                              (unlockedCount / nextMedal.threshold) * 100,
                            )
                          : 100
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* Next medal icon, grayscale until earned */}
              <img
                src={nextMedal?.iconUrl ?? medals[medals.length - 1].iconUrl}
                alt=""
                className="w-16 h-16 rounded-full grayscale opacity-50"
              />
            </div>
            <p className="text-sm text-gray-700">
              {t("Du har bara {{count}} donationer kvar tills du blir {{medal}}!", {
                count: remainingToNext,
                medal: nextMedal?.name,
                defaultValue: "Du har bara {{count}} donationer kvar tills du blir {{medal}}!",
              })}
            </p>
          </section>

          {/* Full medal grid, locked medals are grayed out */}
          <section className={`${container} pb-16`}>
            <div className="grid grid-cols-2 gap-6">
              {medals.map((medal) => (
                <article
                  key={medal.medalId}
                  className="flex items-center gap-6 p-6 rounded-xl border border-gray-300 bg-surface"
                >
                  <img
                    src={medal.iconUrl}
                    alt=""
                    className={`w-20 h-20 rounded-full flex-shrink-0 ${
                      medal.unlocked ? "" : "grayscale opacity-50"
                    }`}
                  />
                  <div className="flex flex-col gap-2 min-w-0">
                    <h3 className="text-lg font-bold text-primary">
                      {medal.name}
                    </h3>
                    <p className="text-sm text-gray-700">{medal.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
}
