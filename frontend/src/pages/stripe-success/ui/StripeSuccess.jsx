import { Button } from "../../../shared/ui/button";
import { Link, Form } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";



export default function StripeSuccess(){
    const navigate = useNavigate();
    const { t } = useTranslation();

    return(
        <main>
            <div className=" mt-[10rem] h-[15rem] flex flex-col items-center justify-between text-gray-700">
                    <h1 className="text-[2rem] font-bold">{t("Kopplingen lyckades!")}</h1>
                    <p>{t("Ditt konto är nu kopplat till Stripe.")}</p>
                <Button className="w-[15rem] bg-primary text-white p-2 rounded-xl hover:bg-accent hover:text-primary cursor-pointer" onClick={() => {navigate(`/settings`)}}>{t("Gå tillbaka till inställningar")}</Button>
            </div>
        </main>
    )
}
