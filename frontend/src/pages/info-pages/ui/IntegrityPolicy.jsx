import { LegalDocsBackGround } from "../../../shared/assets";
import { useTranslation } from "react-i18next";

export default function IntegrityPolicy() {
    const { t } = useTranslation();
    return (
        <div className="min-h-screen flex flex-col bg-bg" style={{
            backgroundImage: `url("${LegalDocsBackGround}")`,
            backgroundSize: "100% auto",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
        }}>
            
            <main className="flex-1 flex flex-col max-w-[62.25rem] w-full mx-auto mt-20 px-5 md:px-4 pb-16">
                <h1 className="text-3xl md:text-5xl mx-auto font-bold text-primary leading-tight pt-16 pb-8 text-center">
                    {t("Integritetspolicy")}
                </h1>
                <div className="flex flex-col mt-10 md:mt-20 gap-6 pb-12">
                    <p className="text-sm leading-5 opacity-70">{t("Senast uppdaterad: 21/5-2026")}</p>
                    {/* Divider line*/}
                    <div className="w-full h-px bg-gray-300" />
                    <p className="text-base leading-6">
                        {t("Välkommen till Athletiqa! Vi värnar om din personliga integritet och vill att du ska känna dig trygg när du använder vår plattform. Denna integritetspolicy förklarar hur vi samlar in, använder, delar och skyddar dina personuppgifter i enlighet med Dataskyddsförordningen (GDPR).")}
                    </p>
                </div>
                <article className="flex flex-col gap-12">
                    <section className="flex flex-col gap-4">
                        <h2 className="text-2xl md:text-3xl font-bold leading-9">{t("1. Vilka personuppgifter samlar vi in?")}</h2>
                        <p className="text-base leading-6">{t("För att Athletiqa ska fungera samlar vi in olika typer av information beroende på hur du använder tjänsten:")}</p>
                        <ul className="list-disc pl-5 flex flex-col gap-2 text-base leading-6">
                            <li><b>{t("Kontouppgifter (Atleter & Vårdnadshavare):")}</b> {t("Namn, e-postadress, ålder, sporttillhörighet, profilbild, textbeskrivningar i insamlingar, samt bankuppgifter (endast för vårdnadshavare) för att kunna betala ut insamlade medel.")}</li>
                            <li><b>{t("Kontouppgifter (Sponsorer & Företag):")}</b> {t("Namn, företagsnamn, e-postadress och profilbild/logotyp.")}</li>
                            <li><b>{t("Betalningsinformation:")}</b> {t("När en donation genomförs samlar vi in transaktionsdata. Själva kort- eller bankuppgifterna hanteras dock säkert av vår betalningspartner (Stripe) och sparas inte i våra system.")}</li>
                            <li><b>{t("Kommunikation och interaktion:")}</b> {t("Meddelanden som skickas i vår chattfunktion, uppnådda milstolpar (medaljer) samt inlägg som publiceras på plattformen.")}</li>
                            <li><b>{t("Teknisk data:")}</b> {t("IP-adress, typ av enhet, webbläsare och information om hur du navigerar på vår plattform (samlas in via cookies).")}</li>
                        </ul>
                    </section>
                    <section className="flex flex-col gap-4">
                        <h2 className="text-2xl md:text-3xl font-bold leading-9">{t("2. Varför samlar vi in uppgifterna? (Ändamål)")}</h2>
                        <p className="text-base leading-6">{t("Vi använder dina personuppgifter för att:")}</p>
                        <ul className="list-disc pl-5 flex flex-col gap-2 text-base leading-6">
                            <li>{t("Skapa och hantera ditt konto på Athletiqa.")}</li>
                            <li>{t("Möjliggöra publicering av insamlingar och genomförande av donationer.")}</li>
                            <li>{t("Driva plattformens sociala funktioner (chatt, inlägg och delning av milstolpar).")}</li>
                            <li>{t("Kommunicera med dig gällande uppdateringar, supportärenden eller tekniska problem.")}</li>
                            <li>{t("Förhindra bedrägerier, missbruk av plattformen och säkerställa en trygg miljö för våra unga användare.")}</li>
                            <li>{t("Följa juridiska krav, såsom bokföringslagen.")}</li>
                        </ul>
                    </section>
                    <section className="flex flex-col gap-4">
                        <h2 className="text-2xl md:text-3xl font-bold leading-9">{t("3. Särskilt om barns integritet")}</h2>
                        <p className="text-base leading-6">
                            {t("Eftersom Athletiqa vänder sig till unga idrottare har vi extra höga säkerhetskrav. För användare under 18 år krävs ett uttryckligt godkännande från en vårdnadshavare för att skapa en profil och ta emot donationer. Vårdnadshavaren har rätt att när som helst begära insyn i, eller radering av, barnets konto.")}
                        </p>
                    </section>
                    <section className="flex flex-col gap-4">
                        <h2 className="text-2xl md:text-3xl font-bold leading-9">{t("4. Vem delar vi dina uppgifter med?")}</h2>
                        <p className="text-base leading-6">{t("Vi säljer aldrig dina personuppgifter till tredje part. Vi kan dock behöva dela viss information med:")}</p>
                        <ul className="list-disc pl-5 flex flex-col gap-2 text-base leading-6">
                            <li><b>{t("Betalningsleverantörer:")}</b> {t("För att kunna genomföra och verifiera säkra transaktioner.")}</li>
                            <li><b>{t("IT-leverantörer:")}</b> {t("Företag som tillhandahåller våra servrar, molntjänster och system för kundsupport (dessa agerar som våra personuppgiftsbiträden och lyder under strikta avtal).")}</li>
                            <li><b>{t("Myndigheter:")}</b> {t("Om vi är skyldiga enligt lag, exempelvis vid misstanke om brott eller för skatteredovisning.")}</li>
                        </ul>
                        <p className="text-base leading-6 mt-2">
                            {t("Observera att information du själv väljer att publicera i din profil, i insamlingar eller inlägg blir offentlig för besökare på plattformen.")}
                        </p>
                    </section>
                    <section className="flex flex-col gap-4">
                        <h2 className="text-2xl md:text-3xl font-bold leading-9">{t("5. Hur länge sparar vi dina uppgifter?")}</h2>
                        <p className="text-base leading-6">
                            {t("Vi sparar dina personuppgifter så länge du har ett aktivt konto hos oss. Om du väljer att avsluta ditt konto raderas eller anonymiseras dina uppgifter, med undantag för transaktionshistorik som vi enligt bokföringslagen måste spara i 7 år.")}
                        </p>
                    </section>
                    <section className="flex flex-col gap-4">
                        <h2 className="text-2xl md:text-3xl font-bold leading-9">{t("6. Hur skyddar vi dina uppgifter?")}</h2>
                        <p className="text-base leading-6">
                            {t("Vi använder modern och branschstandardiserad säkerhetsteknik (som SSL-kryptering) för att skydda dina uppgifter mot obehörig åtkomst, förlust eller manipulation. Vår chattfunktion är stängd för obehöriga och kan granskas av våra moderatorer om en användare anmäls för regelbrott, för att säkerställa atleternas säkerhet.")}
                        </p>
                    </section>
                    <section className="flex flex-col gap-4">
                        <h2 className="text-2xl md:text-3xl font-bold leading-9">{t("7. Dina rättigheter (GDPR)")}</h2>
                        <p className="text-base leading-6">{t("Du har alltid makten över din egen data. Enligt GDPR har du rätt att:")}</p>
                        <ul className="list-disc pl-5 flex flex-col gap-2 text-base leading-6">
                            <li><b>{t("Få tillgång:")}</b> {t("Begära ett registerutdrag på de uppgifter vi har om dig.")}</li>
                            <li><b>{t("Rätta fel:")}</b> {t("Be oss korrigera felaktig eller ofullständig information.")}</li>
                            <li><b>{t("Bli glömd:")}</b> {t("Begära att vi raderar dina personuppgifter (gäller ej data vi måste spara enligt lag).")}</li>
                            <li><b>{t("Dra tillbaka samtycke:")}</b> {t("Om vår behandling bygger på samtycke kan du när som helst dra tillbaka det.")}</li>
                        </ul>
                    </section>
                </article>
                <p className="text-base pt-12">
                    {t("E-post:")} <a href="mailto:hello@athletiqa.se" className="text-primary hover:underline font-medium break-all">hello@athletiqa.se</a>
                </p>
            </main>
        </div>
    );
}