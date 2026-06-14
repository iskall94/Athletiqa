import { Button } from "../../../shared/ui/button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function DonateSuccess()
{
    const navigate = useNavigate();
    const { t } = useTranslation();
    const name = sessionStorage.getItem("athleteName")
    const campaignId = sessionStorage.getItem("campaignId")
    return(
        <>
        <main>
            <section className=" mt-[8rem] h-[15rem] border flex flex-col items-center justify-between text-gray-700">
                <h1 className="text-[2rem] font-bold">{t("{{name}} tackar för din donation!", { name: name || t("Atleten") })}</h1>
                <p className="">{t("Du får ditt kvitto via e-post")}</p>
                <Button className="w-[15rem] bg-primary text-white p-2 rounded-xl hover:bg-accent hover:text-primary cursor-pointer" onClick={() => {navigate(`/campaign/${campaignId}`)}}>{t("Gå tillbaka till inlägget")}</Button>
            </section>
        </main>
        </>
    )

}
