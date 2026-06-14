import { Button } from "../../../shared/ui/button";
import { Avatar } from "../../../shared/ui/avatar";
import { Card } from "../../../shared/ui/card";
import { useTranslation } from "react-i18next";

import {
  UserIcon,
  BellIcon,
  SecurityIcon,
  HeartIcon,
  HelpIcon,
  LogOutIcon,
} from "../../../shared/assets";
import { LogoutUser } from "../../../features/logout-user";
import {
  getAthleteProfile,
  getSponsorProfile,
} from "../../../features/update-settings";
import { useEffect, useState } from "react";
import { checkRole } from "../../../shared/lib";


/*
    Section list - id is what the parent uses for routing, label is what the user sees
    Adding or removing a tab is a one line change
*/
const ATHLETESECTIONS = [
  { id: "profil", label: "Profil", Icon: UserIcon },
  { id: "aviseringar", label: "Aviseringar", Icon: BellIcon },
  { id: "sakerhet", label: "Säkerhet", Icon: SecurityIcon },
  { id: "vardnadshavare", label: "Vårdnadshavare", Icon: HeartIcon },
  { id: "hjalp", label: "Hjälp", Icon: HelpIcon },
];

const SPONSORSECTIONS = [
  { id: "profil", label: "Profil", Icon: UserIcon },
  { id: "aviseringar", label: "Aviseringar", Icon: BellIcon },
  { id: "sakerhet", label: "Säkerhet", Icon: SecurityIcon },
  { id: "hjalp", label: "Hjälp", Icon: HelpIcon },
];

export default function SettingsSidebar({ active, onChange }) {
  const { t } = useTranslation();
  
  const [profile, setProfile] = useState(null);
  const {role, loading} = checkRole();


useEffect(() => {
  async function loadProfile() {
    try {
      if (loading) return;

      if (role === "Athlete") {
        const data = await getAthleteProfile();

        setProfile({
          firstName: data.firstName,
          lastName: data.lastName,
          photoUrl: data.photoUrl,
          gender: data.gender,
        });
      }

      if (role === "SponsorUser" || role === "SponsorCompanyUser") {
        const data = await getSponsorProfile();


        setProfile({
          firstName: data.firstName,
          lastName: data.lastName,
          companyName: data.companyName,
          photoUrl: data.photoUrl,
        });
      }
    } catch (error) {
      console.error("Failed to load profile data: ", error);
    }
  }

  loadProfile();
}, [role, loading]);

  
const isAthlete = role === "Athlete";

  const user = {
  name:
    role === "SponsorCompanyUser"
      ? profile?.companyName ?? ""
      : `${profile?.firstName ?? ""} ${profile?.lastName ?? ""}`,

  role: isAthlete ? t("Atlet") : t("Sponsor"),

  avatarUrl: profile?.photoUrl,
  avatarFallback: isAthlete ? profile?.gender : "company",
};


if (loading || !profile) {
  return <p>{t("Laddar...")}</p>;
}

//------------ATHLETE USERS------------
if(role === "Athlete") {
  return (
    <Card className="flex flex-col gap-6">
      {/* Identity block - avatar, name, role */}
      <div className="flex flex-col items-center gap-2">
        <Avatar src={user.avatarUrl} size="lg" fallback={user.avatarFallback} />
        <h2 className="text-lg font-bold text-primary">{user.name}</h2>
        <span className="text-sm text-gray-500">{user.role}</span>
      </div>

      {/* Settings navigation driven by SECTIONS list above */}
      <nav className="flex flex-col gap-2">
        {ATHLETESECTIONS.map((section) => {
          const isActive = active === section.id;
          const { Icon } = section;
          return (
            <Button
              key={section.id}
              type="button"
              variant="none"
              onClick={() => onChange(section.id)}
              className={`w-full px-4 py-3 rounded-lg text-sm font-medium cursor-pointer transition-colors flex items-center gap-3
                                ${
                                  isActive
                                    ? "bg-primary text-surface"
                                    : "border border-gray-300 text-primary hover:bg-primary-light hover:border-primary-light hover:text-white"
                                }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {t(section.label)}
            </Button>
          );
        })}
      </nav>

      {/* Logout */}
      <LogoutUser
        type="button"
        variant="none"
        className="text-sm text-gray-700 cursor-pointer hover:underline flex items-center gap-3"
      >
        <LogOutIcon className="w-5 h-5 flex-shrink-0" /> 
      </LogoutUser>
    </Card>
  );
  }


  //------------SPONSOR USERS------------
  if(role === "SponsorUser" || role === "SponsorCompanyUser"){
    return (
    <Card className="flex flex-col gap-6">
      {/* Identity block - avatar, name, role */}
      <div className="flex flex-col items-center gap-2">
        <Avatar src={user.avatarUrl} size="lg" fallback={user.avatarFallback} />
        <h2 className="text-lg font-bold text-primary">{user.name}</h2>
        <span className="text-sm text-gray-500">{user.role}</span>
      </div>

      {/* Settings navigation driven by SECTIONS list above */}
      <nav className="flex flex-col gap-2">
        {SPONSORSECTIONS.map((section) => {
          const isActive = active === section.id;
          const { Icon } = section;
          return (
            <Button
              key={section.id}
              type="button"
              variant="none"
              onClick={() => onChange(section.id)}
              className={`w-full px-4 py-3 rounded-lg text-sm font-medium cursor-pointer transition-colors flex items-center gap-3
                                ${
                                  isActive
                                    ? "bg-primary text-surface"
                                    : "border border-gray-300 text-primary hover:bg-primary-light hover:border-primary-light hover:text-white"
                                }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {section.label}
            </Button>
          );
        })}
      </nav>

      {/* Logout */}
      <LogoutUser
        type="button"
        variant="none"
        className="text-sm text-gray-700 cursor-pointer hover:underline flex items-center gap-3"
      >
        <LogOutIcon className="w-5 h-5 flex-shrink-0" /> 
      </LogoutUser>
    </Card>
  );
  }  
}
