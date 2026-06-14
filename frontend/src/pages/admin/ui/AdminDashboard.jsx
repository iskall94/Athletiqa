import { useTranslation } from "react-i18next";

export default function AdminDashboard(){
    const { t } = useTranslation();
    return(
        <h1>{t("Admin Dashboard")}</h1>
    );
}