import { pageContainer } from "../../../shared/config/layout";
import infoBackground from "../../../shared/assets/info-vector.svg?url";
import { howItWorksData } from "../model/howItWorksData";
import { Button } from "../../../shared/ui/button";
import { useState } from "react";
import HowItWorksItem from "./HowItWorksItem";
import { useCurrentUser } from "../../../shared/lib/useCurrentUser";
import { useTranslation } from "react-i18next";


export default function HowItWorkSection() {
  const { currentUser, isLoading } = useCurrentUser();
  const { t } = useTranslation();

  const isAuthenticated = !!currentUser;

  const userStatus = isAuthenticated ? "auth" : "guest";
  const [activeTab, setActiveTab] = useState("sponsor");

  //We have three different roles, 2 are sponsors
  const roleDivider = {
  Athlete: "athlete",
  SponsorUser: "sponsor",
  SponsorCompanyUser: "sponsor",
  };


  const currentTab = currentUser ? roleDivider[currentUser.role] || "sponsor" : activeTab;


  const steps = howItWorksData?.[currentTab]?.[userStatus] ?? [];
  return (
    <section className="relative overflow-hidden py-16 mt-0 md:pt-[10rem] md:py-15 md:mt-[28rem]">
      <div className="absolute inset-x-0 bottom-0 top-20 md:top-[10rem] z-0 pointer-events-none">
        <img
          src={infoBackground}
          alt=""
          className="w-full h-full object-cover object-top"
        />
      </div>
      {!isAuthenticated && (
        <div className="flex galex justify-center mb-20 md:mb-[5rem]">
          <div className="grid grid-cols-2 w-full max-w-[52rem] border-b-2 border-primary-light">
            <Button
              variant="none"
              onClick={() => setActiveTab("sponsor")}
              className={`pb-5 font-semibold !text-2xl rounded-none text-gray-700 -mb-[0.125rem] border-b-2 cursor-pointer transition-colors duration-500 ${
                activeTab === "sponsor"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-700 hover:text-primary"
              }`}
            >
              {t("Sponsorer och företag")}
            </Button>
            <Button
              variant="none"
              onClick={() => setActiveTab("athlete")}
              className={`pb-5 font-semibold !text-2xl rounded-none text-gray-700 -mb-[0.125rem] border-b-2 cursor-pointer transition-colors duration-500 ${
                activeTab === "athlete"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-700"
              }`}
            >
              {t("Atleter och föreningar")}
            </Button>

            <span
              className={`absolute bottom-[0.125rem] left-0 h-[0.125rem] w-1/2 transition-transform duration-700 ease-in-out ${activeTab === "athlete" ? "translate-x-full" : "translate-x-0"}`}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col gap-16">
        {steps.map((item) => (
          <HowItWorksItem
            key={item.id}
            title={item.title}
            description={item.description}
            image={item.image}
            imageAlt={item.imageAlt}
            imagePosition={item.imagePosition}
            buttons={item.buttons}
          />
        ))}
      </div>
    </section>
  );
}
