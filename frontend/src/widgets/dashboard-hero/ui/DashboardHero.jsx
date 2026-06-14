import authPerson from "../../../shared/assets/authPerson-vector.svg?url";
import { pageContainer } from "../../../shared/config/layout";
import AthleteDashboardHeroActions from "./AthleteDashboardHeroActions";
import SponsorDashboardHeroActions from "./SponsorDashboardHeroActions";
import DonationStats from "./SponsorDonationStats";
import SponsorDonationStats from "./SponsorDonationStats";
import AthleteCurrentCampaign from "./AthleteCurrentCampaign";
import { checkRole } from "../../../shared/lib";
import { useTranslation } from "react-i18next";

export default function DashboardHero({ user }) {

  const { t } = useTranslation();
  const {role, loading} = checkRole();

  if(loading)
  {
    return <p>{t("Laddar...")}</p>
  }
  
  
  return (
    <section className="relative overflow-visible py-12 pb-24">
      <div className="relative">
        <div
          style={{
            backgroundImage: `url("${authPerson}")`,
          }}
          className="absolute inset-x-0 top-0 h-[135rem] pointer-events-none z-0 bg-no-repeat bg-[length:115%_auto] bg-[position:center_-7rem]"
        />
      </div>
      {/* Hero — large text above full-width video */}
      <div className="relative z-10 pt-[7rem] mt-7 flex flex-col justify-center items-center ">
        <div className={`${pageContainer}  mx-auto`}>
          <h1 className="font-heading mx-auto font-extrabold text-5xl text-primary leading-[4rem] max-w-[55rem]">
            {t("Välkommen tillbaka, {{name}}", { name: user.name })}
          </h1>
        </div>
      </div>

      <div className="mt-20 flex justify-center gap-6">
        {role === "Athlete" ? (
          <AthleteDashboardHeroActions />
        ) : (
          <SponsorDashboardHeroActions />
        )}
      </div>

      {role === "Athlete" ? (
        <AthleteCurrentCampaign />
      ) : (
        <div className="mt-20 flex justify-center gap-6">
          <SponsorDonationStats user={user} />
        </div>
      )}

      {/* {(role === "SponsorUser" || role === "SponsorCompanyUser") && (
      )} */}
    </section>
  );
}
