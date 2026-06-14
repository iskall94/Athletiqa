import { FormField } from "../../../shared/ui/input";
import { RadioGroup } from "../../../shared/ui/radio-group";
import { Button } from "../../../shared/ui/button";
import { Alert } from "../../../shared/ui/alert";
import { FormActions } from "../../../shared/ui/form-actions";
import { useGuardianSettings } from "../model";
import { useTranslation } from "react-i18next";


// Mock starting state. Swap with backend values when ready.
const initialGuardian = {
  firstName: "",
  lastName: "",
  relationship: "", // "Parent" | "LegalGuardian" | "Sibling" | "Other"
  email: "",
  phonenumber: "",
};

// Radio options for "Din relation". One line per option, easy to add more.
const RELATIONS = [
  { value: "Parent", label: "Förälder" },
  { value: "LegalGuardian", label: "Vårdnadshavare" },
  { value: "Sibling", label: "Syskon" },
  { value: "Other", label: "Annat" },
];

export default function GuardianSettingsForm() {
  const { t } = useTranslation();
    const { 
      guardian, 
      handleChange, 
      isDirty, 
      handleCancel, 
      handleSubmit 
    } = useGuardianSettings();

  
  return (
    <div className="flex flex-col gap-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <h1 className="hidden lg:block text-2xl font-bold text-primary">{t("Vårdnadshavare")}</h1>

        {/* First + last name, side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label={t("Förnamn")}
            name="firstName"
            value={guardian.firstName}
            onChange={handleChange}
          />

          <FormField
            label={t("Efternamn")}
            name="lastName"
            value={guardian.lastName}
            onChange={handleChange}
          />
        </div>

        {/* Relation radios. Share `name="relation"` so only one is picked. */}
        <RadioGroup
          name="relationship"
          value={guardian.relationship}
          onChange={handleChange}
          options={RELATIONS}
          legend={t("Din relation")}
        />

        {/* Email + phone side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label={t("E-postadress")}
            type="email"
            name="email"
            value={guardian.email}
            onChange={handleChange}
          />

          <div className="flex flex-col gap-3">
            <FormField
              label={t("Telefonnummer")}
              type="tel"
              name="phonenumber"
              value={guardian.phonenumber}
              onChange={handleChange}
            />

            {/* Info card explaining the phone is used for donations */}
            <Alert>
              {t("Det telefonnummer som anges kommer att vara mottagaren för betalningarna som görs i donationer.")}
            </Alert>
          </div>
        </div>

        {/* Save + cancel only show when something changed */}
        <FormActions show={isDirty} onCancel={handleCancel} />
      </form>

      {/* FAQ section, sits outside the form so it doesn't submit on click */}
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold text-primary">
          {t("Behöver du mer info om vårdnadshavare?")}
        </h2>
        <p className="text-sm text-gray-700">
          {t("Här hittar du svar på vanliga frågor om vårdnadshavare och hur funktionen fungerar på plattformen.")}
        </p>
        <Button
          variant="primary"
          onClick={() => console.log("TODO: navigate to /faq/guardian")}
          className="w-full sm:w-fit px-6 py-3 font-medium"
          >
          {t("Vanliga frågor och svar")}
        </Button>
      </section>
    </div>
  );
}
