import { Modal } from "../../../shared/ui/modal";
import { Button } from "../../../shared/ui/button";
import { useTranslation } from "react-i18next";

// Confirmation modal that appears when the user clicks "Blockera" from a comment's
// dropdown menu. Currently just console.logs the user id, will hit the real
// block API once the backend endpoint exists.
export function BlockUserModal({ isOpen, onClose, user, onConfirm }) {
  const { t } = useTranslation();
  // Fires the (eventual) API call, notifies the parent + closes the modal.
  const handleBlock = () => {
    // TODO: call blockUserApi(user.userId) when backend is ready
    console.log("TODO: block user", user?.userId ?? user?.id);
    if (onConfirm) onConfirm(user);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="!max-w-md">
      <div className="p-8 flex flex-col gap-6">
        {/* Title */}
        <h2 className="text-2xl font-bold text-primary text-center">
          {t("Blockera användare")}
        </h2>

        {/* Explanation of what blocking does */}
        <p className="text-sm text-gray-700 text-center">
          {t("Blockerade användare kan inte se din profil, dina inlägg eller skicka meddelanden till dig.")}
        </p>

        {/* Confirm + cancel buttons stacked */}
        <div className="flex flex-col gap-2">
          <Button
            variant="danger"
            onClick={handleBlock}
            className="w-full py-3 font-medium !bg-red-600 !text-white !border-red-600 hover:!bg-red-700"
          >
            {t("Blockera användare")}
          </Button>

          <Button
            variant="none"
            onClick={onClose}
            className="w-full py-3 font-medium text-gray-700 hover:text-primary"
          >
            {t("Avbryt")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
