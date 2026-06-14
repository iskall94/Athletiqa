import { FormField } from "../../../shared/ui/input";
import { Button } from "../../../shared/ui/button";
import { Switch } from "../../../shared/ui/switch";
import { Alert } from "../../../shared/ui/alert";
import { FormActions } from "../../../shared/ui/form-actions";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { DeleteAccountSection } from "../ui";
import { useFormState } from "../../../shared/lib/";
import { BlockedUsersModal } from "../ui";
import { checkRole } from "../../../shared/lib";
import { ConnectStripeButton } from "../../connect-stripe-account/ui";

// Mock starting state. Password fields start empty,
// anonymous flag starts off.
const initialState = {
  anonymous: false,
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};
export default function SecuritySettingsForm() {
  const { values: state, setField, handleChange } = useFormState(initialState);
  const { t } = useTranslation();
  const toggleAnonymous = (next) => setField("anonymous", next);
  const [blockedOpen, setBlockedOpen] = useState(false);
  const { role, loading } = checkRole();

  // Save/cancel show when the anonymous flag differs from the saved value.
  const anonymousDirty = state.anonymous !== initialState.anonymous;

  const handleAnonymousSubmit = (e) => {
    e.preventDefault();
    console.log("Saving anonymous:", state.anonymous);
    // TODO: call settingsApi.updateAnonymity(state.anonymous)
  };

  const handleAnonymousCancel = () => {
    setField("anonymous", initialState.anonymous);
  };

  // Save/cancel only show when at least one password field has text.
  const passwordDirty =
    state.currentPassword || state.newPassword || state.confirmPassword;

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    console.log("Saving password:", state);
    // TODO: call settingsApi.updatePassword(state)
  };
  const handlePasswordCancel = () => {
    setField("currentPassword", "");
    setField("newPassword", "");
    setField("confirmPassword", "");
  };

  return (
    <div className="flex flex-col gap-10">
      <h1 className="hidden lg:block text-2xl font-bold text-primary">{t("Säkerhet")}</h1>

      {/* Anonymity toggle + info card */}
      <form onSubmit={handleAnonymousSubmit} className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Switch checked={state.anonymous} onChange={toggleAnonymous} />
          <span className="text-sm text-gray-700">{t("Jag vill vara anonym")}</span>
        </div>

        <Alert>
          {t("Om du väljer att være anonym kommer varken andra atleter eller sponsorer kunna se din identitet.")}
          <br />
          {t("Att vara anonym minskar dock chansen att bli sponsrad, eftersom sponsorer oftast vill veta vem de donerar pengar till.")}
        </Alert>

        <FormActions show={anonymousDirty} onCancel={handleAnonymousCancel} />
      </form>

      {/*Show Stripe-Connect Button if user is Athlete*/}
      {role === "Athlete" && (
        <div className="flex flex-col gap-3">
            <p className="text-sm text-gray-700">
              {t("För att kunna ta emot sponsring och utbetalningar behöver du koppla ditt konto till Stripe. Stripe används för att hantera betalningar på ett säkert sätt.")}
            </p>
            <ConnectStripeButton></ConnectStripeButton>
        </div>
      )}

      {/* Blocked users */}
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold text-primary">{t("Blockerade användare")}</h2>
        <p className="text-sm text-gray-700">
          {t("Hantera listan över användare du har blockerat. Blockerade användare kan inte se din profil, dina inlägg eller skicka meddelanden till dig.")}
        </p>
        <Button
          variant="outline"
          onClick={() => setBlockedOpen(true)}
          className="w-fit px-6 py-3 font-medium"
        >
          {t("Se listan")}
        </Button>
      </section>

      {/* Change password */}
      <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
        <h2 className="text-lg font-bold text-primary">{t("Ändra lösenord")}</h2>

        <FormField
          label={t("Nuvarande lösenord")}
          type="password"
          name="currentPassword"
          value={state.currentPassword}
          onChange={handleChange}
        />

        <a href="#" className="text-sm text-gray-700 underline w-fit">
          {t("Glömt lösenord?")}
        </a>

        <FormField
          label={t("Nytt lösenord")}
          type="password"
          name="newPassword"
          value={state.newPassword}
          onChange={handleChange}
        />

        <FormField
          label={t("Bekräfta nytt lösenord")}
          type="password"
          name="confirmPassword"
          value={state.confirmPassword}
          onChange={handleChange}
        />

        <FormActions
          show={!!passwordDirty}
          submitLabel={t("Spara nytt lösenord")}
          onCancel={handlePasswordCancel}
        />
      </form>

      <DeleteAccountSection />

      <BlockedUsersModal
        isOpen={blockedOpen}
        onClose={() => setBlockedOpen(false)}
      />
    </div>
  );
}