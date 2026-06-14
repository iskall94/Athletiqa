import { useState } from "react";
import { Button } from "../../../shared/ui/button";
import { Modal } from "../../../shared/ui/modal";
import { useTranslation } from "react-i18next";

// Danger zone. Sits at the bottom of the profile + security tabs.
// Lives outside any form so submitting a form can't trigger it.
export default function DeleteAccountSection() {
  const { t } = useTranslation();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleConfirmDelete = () => {
    console.log("TODO: call settingsApi.requestAccountDeletion()");
    setShowConfirm(false);
    setShowConfirmation(true);
  };

  const handleCancelDeletion = () => {
    console.log("TODO: call settingsApi.cancelAccountDeletion()");
    setShowConfirmation(false);
  };

    return (
        <section className="flex flex-col gap-3">
            <h2 className="text-lg font-bold text-primary">{t("Radera konto")}</h2>
            <p className="text-sm text-gray-700">
              {t("När du raderar ditt konto försvinner din profil, dina bilder, meddelanden och all annan data permanent. Du kan inte återställa kontot efteråt.")}
            </p>
            <Button
                variant="danger"
        onClick={() => setShowConfirm(true)}
                className="w-fit px-6 py-3 font-medium"
            >
                {t("Radera konto")}
            </Button>

      {/* Step 1 — Confirm delete */}
      <Modal isOpen={showConfirm} onClose={() => setShowConfirm(false)}>
        <div className="p-8 flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-primary text-center">
            {t("Är du säker på att du vill lämna laget?")}
          </h2>
          <div className="text-sm text-gray-700 text-center flex flex-col gap-2">
            <p>
              {t("Om du fortsätter startar vi processen för att radera ditt konto.")}
            </p>
            <p className="font-bold">
              {t("Ditt konto kommer att deaktiveras och inte synas på plattformen längre. Det kan ta upp till 7-30 dagar innan all information är helt borttaget.")}
            </p>
            <p>
              {t("Du får även ett e-postmeddelande där du kan avbryta raderingen om du ångrar dig.")}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Button
              variant="danger"
              onClick={handleConfirmDelete}
              className="w-full py-3 font-medium"
            >
              {t("Radera konto")}
            </Button>
            <Button
              variant="primary"
              onClick={() => setShowConfirm(false)}
              className="w-full py-3 font-medium"
            >
              {t("Avbryt")}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Step 2, Confirmation email sent */}
      <Modal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
      >
        <div className="p-8 flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-primary text-center">
            {t("Bekräftelse skickad!")}
          </h2>
          <div className="text-sm text-gray-700 text-center flex flex-col gap-4">
            <p>
              {t("Du har nu fått ett e-postmeddelande där du behöver bekräfta raderingen av ditt konto. Du kan fortfarande avbryta processen, både här och via länken i mejlet.")}
            </p>
            <p>
              {t("Vi håller platsen varm ifall du väljer att stanna kvar i laget.")}
            </p>
          </div>
          <Button
            variant="primary"
            onClick={handleCancelDeletion}
            className="w-full py-3 font-medium"
          >
            {t("Avbryt raderingen")}
          </Button>
        </div>
      </Modal>
        </section>
    );
}
