import Button from "../button/Button";
import { useTranslation } from "react-i18next";

// Save + Cancel button pair shown at the bottom of a form.
// Renders nothing unless `show` is true, so forms can pass
// their `isDirty` flag straight in.
function FormActions({ show, submitLabel = "Spara ändringar", onCancel }) {
    const { t } = useTranslation();
    if (!show) return null;

    return (
        <div className="flex items-center gap-3">
            <Button
                type="submit"
                variant="primary"
                className="px-6 py-3 font-medium"
            >
                {t(submitLabel)}
            </Button>
            <Button
                variant="outline"
                onClick={onCancel}
                className="px-6 py-3 font-medium"
            >
                {t("Avbryt")}
            </Button>
        </div>
    );
}

export default FormActions;
