import { Button } from "../../../shared/ui/button";
import { useLogoutUser } from "../model/useLogoutUser";
import { LogOutIcon } from "../../../shared/assets";
import { useTranslation } from "react-i18next";

export default function LogoutUser() {
    const { t } = useTranslation();
    const { logoutUserAccount, error } = useLogoutUser();
    return(
        <>
            <Button 
            onClick={logoutUserAccount}
             type="button"
                    variant="none"
                    className="text-sm text-gray-700 cursor-pointer hover:underline flex items-center gap-3">
                    <LogOutIcon className="w-5 h-5 flex-shrink-0" />
                    {t("Logga ut")}
            </Button>
            {error && <p>{error}</p>}
        </>
    )
}