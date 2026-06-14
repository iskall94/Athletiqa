import { LegalDocsBackGround } from "../../../shared/assets";
import { useTranslation } from "react-i18next";

export default function UserTermsAndConditions() {
    const { t } = useTranslation();
    return (
        <div className="min-h-screen flex flex-col bg-bg"
            style={{
                backgroundImage: `url("${LegalDocsBackGround}")`,
                backgroundSize: "100% auto",
                backgroundPosition: "top",
                backgroundRepeat: "no-repeat",
            }}>
        
            <main className="flex-1 flex flex-col max-w-[62.25rem] mt-20 w-full mx-auto px-5 md:px-4 pb-16">
                <h1 className="text-3xl md:text-5xl mx-auto font-bold text-primary leading-tight pt-16 pb-8 text-center">
                    {t("Användarvillkor")}
                </h1>
                <div className="flex flex-col gap-6 mt-10 md:mt-20 pb-12">
                    <p className="text-sm leading-5 opacity-70">{t("Senast uppdaterad: 21/5-2026")}</p>
                    {/* Divider line*/}
                    <div className="w-full h-px bg-gray-300" />
                    <p className="text-base leading-6">
                        {t("Välkommen till Athletiqa! Dessa användarvillkor reglerar din användning av vår webbplats och våra tjänster. Genom att skapa ett konto eller använda plattformen godkänner du dessa villkor. Läs dem noggrant.")}
                    </p>
                </div>
                <article className="flex flex-col gap-12">
                    <section className="flex flex-col gap-4">
                        <h2 className="text-2xl md:text-3xl font-bold leading-9">{t("1. Om Athletiqa")}</h2>
                        <p className="text-base leading-6">
                            {t("Athletiqa är en plattform som kopplar samman unga idrottare med privatpersoner och företag som vill stötta deras idrottssatsningar ekonomiskt. Vi tillhandahåller tekniken för att starta insamlingar, donera pengar och kommunicera via vår plattform.")}
                        </p>
                    </section>
                    <section className="flex flex-col gap-4">
                        <h2 className="text-2xl md:text-3xl font-bold leading-9">{t("2. Konton och Åldersgräns")}</h2>
                        <p className="text-base leading-6">{t("För att säkerställa en trygg miljö gäller följande för kontoskapande:")}</p>
                        <ul className="list-disc pl-5 flex flex-col gap-2 text-base leading-6">
                            <li><b>{t("För atleter under 18 år:")}</b> {t("Du måste ha ett godkännande från en vårdnadshavare för att skapa ett konto och starta en insamling. Vårdnadshavaren är juridiskt och ekonomiskt ansvarig för kontot och de medel som samlas in.")}</li>
                            <li><b>{t("För sponsorer/donatorer:")}</b> {t("Du måste vara minst 18 år gammal för att skapa ett konto och genomföra donationer. Företagskonton måste skapas av en person med behörighet att företräda företaget.")}</li>
                            <li><b>{t("Kontosäkerhet:")}</b> {t("Du är ansvarig för att hålla dina inloggningsuppgifter hemliga. Athletiqa ansvarar inte för obehörig åtkomst som beror på att du har delat dina uppgifter.")}</li>
                        </ul>
                    </section>
                    <section className="flex flex-col gap-4">
                        <h2 className="text-2xl md:text-3xl font-bold leading-9">{t("3. Regler för Insamlingar - För atleter och vårdnadshavare")}</h2>
                        <p className="text-base leading-6">{t("När du startar en insamling förbinder du dig att:")}</p>
                        <ul className="list-disc pl-5 flex flex-col gap-2 text-base leading-6">
                            <li><b>{t("Vara ärlig:")}</b> {t("All information i din profil och i dina insamlingar ska vara sanningsenlig. Du får inte överdriva eller hitta på behov.")}</li>
                            <li><b>{t("Använda pengarna rätt:")}</b> {t("Donerade medel får endast användas till det idrottsrelaterade ändamål som angavs i insamlingen (t.ex. utrustning, cupavgifter, resor).")}</li>
                            <li><b>{t("Inga garantier:")}</b> {t("Athletiqa kan inte garantera att din insamling reaches sitt mål.")}</li>
                        </ul>
                    </section>
                    <section className="flex flex-col gap-4">
                        <h2 className="text-2xl md:text-3xl font-bold leading-9">{t("4. Regler för Donationer - För sponsorer och privatpersoner")}</h2>
                        <p className="text-base leading-6">{t("När du donerar via Athletiqa godkänner du följande:")}</p>
                        <ul className="list-disc pl-5 flex flex-col gap-2 text-base leading-6">
                            <li><b>{t("Frivillighet:")}</b> {t("Alla donationer sker frivilligt. Athletiqa är en förmedlande plattform och granskar inte manuellt varje insamling i detalj.")}</li>
                            <li><b>{t("Ingen återbetalning:")}</b> {t("Genomförda donationer är slutgiltiga och kan i regel inte återbetalas via plattformen, såvida inte lagstiftning kräver det eller om tekniska fel uppstått.")}</li>
                            <li><b>{t("Syfte:")}</b> {t("Donationer är gåvor för att stötta idrottare, inte investeringar. Du får inget ägandeskap eller ekonomisk avkastning för ditt bidrag.")}</li>
                        </ul>
                    </section>
                    <section className="flex flex-col gap-4">
                        <h2 className="text-2xl md:text-3xl font-bold leading-9">{t("5. Uppförandekod och Chattfunktion")}</h2>
                        <p className="text-base leading-6">{t("Athletiqa ska vara en trygg och peppande plats. Följande är strikt förbjudet och leder till omedelbar avstängning:")}</p>
                        <ul className="list-disc pl-5 flex flex-col gap-2 text-base leading-6">
                            <li>{t("Hatbrott, diskriminering, mobbning eller trakasserier.")}</li>
                            <li>{t("Delning av olagligt, pornografiskt eller våldsamt innehåll.")}</li>
                            <li>{t("Spam, vilseledande marknadsföring eller bedrägeriförsök.")}</li>
                            <li>{t("Att kontakta unga atleter i syften som inte är relaterade till att stötta deras idrottsutövning.")}</li>
                        </ul>
                    </section>
                    <section className="flex flex-col gap-4">
                        <h2 className="text-2xl md:text-3xl font-bold leading-9">{t("6. Avgifter och Betalningshantering")}</h2>
                        <p className="text-base leading-6">
                            {t("Att skapa ett konto på Athletiqa är gratis. För att hantera transaktioner använder vi tredjepartsleverantören Stripe. Vid varje donation kan en mindre transaktionsavgift tillkomma för att täcka bankkostnader och plattformens drift. Detta redovisas tydligt i samband med betalningen.")}
                        </p>
                    </section>
                    <section className="flex flex-col gap-4">
                        <h2 className="text-2xl md:text-3xl font-bold leading-9">{t("7. Personuppgifter och Integritet")}</h2>
                        <p className="text-base leading-6">
                            {t("Vi värnar om din integritet. Hur vi samlar in, lagrar och hanterar dina personuppgifter, inklusive bilder och chattloggar, regleras i vår Integritetspolicy, som är utformad i enlighet med GDPR.")}
                        </p>
                    </section>
                    <section className="flex flex-col gap-4">
                        <h2 className="text-2xl md:text-3xl font-bold leading-9">{t("8. Ansvarsbegränsning")}</h2>
                        <p className="text-base leading-6">
                            {t("Athletiqa ansvarar inte för tvister mellan donatorer och atleter, eller för att atleter presterar specifika resultat. Vi garanterar inte att plattformen alltid är fri från tekniska avbrott eller fel, men vi arbetar löpande för att erbjuda en så stabil tjänst som möjligt.")}
                        </p>
                    </section>
                    <section className="flex flex-col gap-4">
                        <h2 className="text-2xl md:text-3xl font-bold leading-9">{t("9. Rätt att stänga av konton")}</h2>
                        <p className="text-base leading-6">
                            {t("Athletiqa förbehåller sig rätten att när som helst, och utan förvarning, stänga ner konton eller ta bort insamlingar som bryter mot dessa villkor eller svensk lag.")}
                        </p>
                    </section>
                    <section className="flex flex-col gap-4">
                        <h2 className="text-2xl md:text-3xl font-bold leading-9">{t("10. Ändringar av villkoren")}</h2>
                        <p className="text-base leading-6">
                            {t("Vi kan komma att uppdatera dessa villkor. Vid större förändringar kommer vi att meddela registrerade användare via e-post eller genom ett tydligt meddelande på plattformen.")}
                        </p>
                    </section>
                </article>
                <p className="text-base pt-12">
                    {t("E-post:")} <a href="mailto:hello@athletiqa.se" className="text-primary hover:underline font-medium break-all">hello@athletiqa.se</a>
                </p>
            </main>
        </div>
    );
}