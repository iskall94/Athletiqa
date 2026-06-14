import { Button } from "../../../shared/ui/button";
import  Runner  from "../../../shared/assets/runner.svg?react";
import  Sponsor from "../../../shared/assets/sponsor.svg?react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
// This is the RoleSwitcher component that renders two buttons for switching between athlete and sponsor roles.
// It takes in the current role and a function to handle role changes as props.
// The buttons are disabled based on the current role, but will be switched to active state in CSS later.
const getButtonClass = ({ isChosen, isNotActive }) => {
  if (isChosen) {
    return "bg-accent text-primary border-none";
  }

  if (isNotActive) {
    return "bg-gray-500 text-gray-700 cursor-not-allowed border-none";
  }

  return "bg-bg text-primary border-primary ";
};

function RoleSwitcher({ role, onRoleChange }) {
  const { t } = useTranslation();
  const athleteChosen = role === "athlete";
  const sponsorChosen = role === "sponsor";

  const hasChosenRole = role !== null;

  const athleteNotActive = hasChosenRole && !athleteChosen;
  const sponsorNotActive = hasChosenRole && !sponsorChosen;

  return (
    <div className=" mx-auto mt-10 w-full max-w-[62rem]">
      <div className="flex items-center justify-center gap-6">
        <Button
          variant="none"
          onClick={() => onRoleChange("athlete")}
          className={`w-[16rem] h-[6rem] relative py-5 px-8 flex flex-col 
        items-center justify-center  rounded-xl border  leading-6
        no-underline transition-colors duration-500 ease-out gap-2
        hover:bg-primary hover:text-bg
        ${getButtonClass({
          isChosen: athleteChosen,
          isNotActive: athleteNotActive,
        })}`}
        >
          <Runner className="w-8 h-8" />
          <span className="text-center text-lg font-semibold leading-6">
            {t("Atlet")}
          </span>
        </Button>
        <Button
          variant="none"
          onClick={() => onRoleChange("sponsor")}
          className={`w-[16rem] h-[6rem] relative py-5 px-8 flex flex-col 
        items-center justify-center  rounded-xl border  leading-6
        no-underline transition-colors duration-500 ease-out
         hover:bg-primary hover:text-bg
         ${getButtonClass({
           isChosen: sponsorChosen,
           isNotActive: sponsorNotActive,
         })}`}
        >
          <Sponsor className="w-8 h-8" />
          <span className="text-center text-lg text-semibold  leading-6">
            {t("Sponsor")}
          </span>
        </Button>
      </div>
    </div>
  );
}

export default RoleSwitcher;
