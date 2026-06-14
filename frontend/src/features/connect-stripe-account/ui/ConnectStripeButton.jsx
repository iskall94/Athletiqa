import { Button } from "../../../shared/ui/button";
import {useStripeAccount} from "../model/useStripeAccount"
import { useTranslation } from "react-i18next";

export default function ConnectStripeButton() {
    const { connectStripeAccount, error } = useStripeAccount();
    const { t } = useTranslation();
    return (
        <>
            <Button className="w-[10rem]" onClick={connectStripeAccount}>{t("Till Stripe")}</Button>
            {error && <p className="error-text">{error}</p>}
        </>
    );
}