import { CheckBox } from "../../../shared/ui/checkbox";
import { useTranslation } from "react-i18next";

function OrganizationToggle({ role, isMinor, checked, onChange }) {
  const { t } = useTranslation();
  const isShowing= (role === "athlete" && !isMinor) || role === "sponsor" ;
  if (!isShowing) {
    return null;
  }
  
  const label=role==="athlete" ? t("Jag registrerar mig som en förening") : t("Jag registrerar mig som ett företag");

  return (
    <CheckBox
      name="organization"
      id="organization"
      label={label}
      checked={checked}
      onChange={onChange}
      className="text-gray-700 text-sm font-normal "
    />
  );
}

export default OrganizationToggle;
