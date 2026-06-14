import { LegalDocsBackGround } from "../../../shared/assets";
import { useTranslation } from "react-i18next";

export default function DonationTermsAndConditions() {
  const { t } = useTranslation();
  return (
    <div
      className="min-h-screen flex flex-col bg-bg"
      style={{
        backgroundImage: `url("${LegalDocsBackGround}")`,
        backgroundSize: "100% auto",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <main className="flex-1 flex flex-col max-w-[62.25rem] w-full mx-auto mt-20 px-5 md:px-8 pb-16 relative z-10">
        <h1 className="text-3xl md:text-5xl mx-auto font-extrabold text-primary leading-tight pt-16 pb-8 text-center">
          {t("Donationsvillkor")}
        </h1>
        <div className="flex flex-col gap-6 mt-10 md:mt-20 pb-12">
          <p className="text-sm leading-5 opacity-70">
            {t("Senast uppdaterad: 21/5-2026")}
          </p>
          {/* Divider line*/}
          <div className="w-full h-[0.0625rem] bg-gray-300" />
          <p className="text-base leading-6">
            {t("Välkommen till Athletiqa! Dessa köp- och donationsvillkor gäller när du som privatperson eller företag väljer att donera pengar till en atlet eller förening via vår plattform Athletiqa. Läs igenom villkoren noggrant innan du genomför din betalning.")}
          </p>
        </div>
        <article className="flex flex-col gap-12">
          <section className="flex flex-col gap-4">
            <h2 className="text-2xl md:text-3xl font-bold leading-9">
              {t("1. Allmänt om transaktionen")}
            </h2>
            <p className="text-base leading-6">
              {t("När du genomför en transaktion på Athletiqa gör du en frivillig donation. En donation är en gåva utan krav på motprestation från vare sig atleten, föreningen eller Athletiqa. Du köper alltså inte en vara eller en tjänst.")}
            </p>
          </section>
          <section className="flex flex-col gap-4">
            <h2 className="text-2xl md:text-3xl font-bold leading-9">
              {t("2. Betalningsmetoder")}
            </h2>
            <p className="text-base leading-6">
              {t("Vi erbjuder trygga och säkra betalningar via vår samarbetspartner Stripe. Beroende på vald betalningsmetod kan du donera med bankkort (Visa/Mastercard), direktbanköverföring eller mobila betalsätt. Dina betalningsuppgifter hanteras alltid krypterat av vår betalningsleverantör och sparas inte av Athletiqa.")}
            </p>
          </section>
          <section className="flex flex-col gap-4">
            <h2 className="text-2xl md:text-3xl font-bold leading-9">{t("3. Avgifter")}</h2>
            <p className="text-base leading-6">
              {t("Att skapa ett konto och donera via Athletiqa är helt gratis för dig som donator. Den summa du väljer att donera är den summa som dras från ditt konto.")}
            </p>
          </section>
          <section className="flex flex-col gap-4">
            <h2 className="text-2xl md:text-3xl font-bold leading-9">
              {t("4. Ångerrätt och Återbetalning")}
            </h2>
            <p className="text-base leading-6">
              {t("Eftersom en donation är en frivillig gåva och inte ett köp av en vara eller tjänst, gäller inte den lagstadgade ångerrätten på 14 dagar enligt Lagen om distansavtal och avtal utanför affärslokaler. Alla genomförda donationer är slutgiltiga.")}
            </p>
            <p className="text-base leading-6">
              {t("Återbetalning sker endast i undantagsfall, till exempel om ett tekniskt fel har uppstått och din betalning har dragits dubbelt. Om du misstänker ett tekniskt fel, kontakta vår support omedelbart.")}
            </p>
          </section>
          <section className="flex flex-col gap-4">
            <h2 className="text-2xl md:text-3xl font-bold leading-9">
              {t("5. Användning av donerade medel")}
            </h2>
            <p className="text-base leading-6">
              {t("Atleterna och föreningarna förbinder sig i våra Användarvillkor att endast använda insamlade medel till de idrottsrelaterade ändamål som anges i deras insamling, exempelvis cupavgifter, utrustning eller träningsläger.")}
            </p>
            <p className="text-base leading-6">
              {t("Athletiqa granskar dock inte varje enskild individs privata utlägg och är inte återbetalningsskyldiga om en atlet mot förmodan skulle bryta mot plattformens regler.")}
            </p>
          </section>
          <section className="flex flex-col gap-4">
            <h2 className="text-2xl md:text-3xl font-bold leading-9">
              {t("6. Skatter och avdrag")}
            </h2>
            <p className="text-base leading-6">
              <b>{t("Privatpersoner:")}</b> {t("Donationer till enskilda atleter via plattformen är normalt sett inte skatteavdragsgilla för privatpersoner.")}
            </p>
            <p className="text-base leading-6">
              <b>{t("Företag och sponsorer:")}</b> {t("Företag ansvarar själva för att undersöka gällande skatteregler och huruvida deras donation kan bokföras som sponsring eller gåva enligt Skatteverkets riktlinjer. Athletiqa tillhandahåller endast ett kvitto på genomförd transaktion.")}
            </p>
          </section>
          <section className="flex flex-col gap-4">
            <h2 className="text-2xl md:text-3xl font-bold leading-9">
              {t("7. Kvitto och bekräftelse")}
            </h2>
            <p className="text-base leading-6">
              {t("När din donation har gått igenom skickas en bekräftelse och ett digitalt kvitto till den e-postadress du angav vid betalningen, eller den som är kopplad till ditt Athletiqa-konto. Detta fungerar som ditt underlag för transaktionen.")}
            </p>
          </section>
          <section className="flex flex-col gap-4">
            <h2 className="text-2xl md:text-3xl font-bold leading-9">
              {t("8. Kontakt och support")}
            </h2>
            <p className="text-base leading-6">
              {t("Om du har problem med en betalning, saknar ditt kvitto eller har andra frågor kring din donation, är du alltid välkommen att höra av dig till oss!")}
            </p>
          </section>
        </article>
        <p className="text-base pt-12">
          E-post:{" "}
          <a href="mailto:hello@athletiqa.se" className="text-primary hover:underline font-medium break-all">
            hello@athletiqa.se
          </a>
        </p>
      </main>
    </div>
  );
}