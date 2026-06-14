import { Button } from "../../../shared/ui/button";
import PhoneIcon from "../../../shared/assets/phone.svg?react";
import EmailIcon from "../../../shared/assets/email.svg?react";
import { useTranslation } from "react-i18next";

// Help tab, just contact info and a link to the FAQ.
// No form state needed.
export default function HelpSection() {
  const { t } = useTranslation();
  return (
    <main>
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-primary">{t("Hjälp")}</h1>
        <p className="text-sm text-gray-700">
          {t("Kontakta vår kundtjänst för hjälp")}
        </p>
      </div>

      {/* Contact card */}
      <div className="flex flex-col gap-3 rounded-lg bg-accent-pale p-6">
        <a
          href="tel:+46712345678"
          className="flex items-center gap-3 text-lg font-bold text-primary hover:underline"
        >
          <PhoneIcon className="w-5 h-5 flex-shrink-0" />
          +46 71 234 56 78
        </a>
        <a
          href="mailto:hello@athletiqa.se"
          className="flex items-center gap-3 text-lg font-bold text-primary hover:underline"
        >
          <EmailIcon className="w-5 h-5 flex-shrink-0" />
          hello@athletiqa.se
        </a>
      </div>

      {/* FAQ section */}
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold text-primary">
          {t("Vanliga frågor och svar")}
        </h2>
        <p className="text-sm text-gray-700">
          {t(
            "Har du frågor om funktioner, inställningar eller ditt konto? Här hittar du svar på de vanligaste frågorna och guider som hjälper dig vidare."
          )}
        </p>
        <Button
          variant="primary"
          onClick={() => console.log("TODO: navigate to /faq")}
          className="w-fit px-6 py-3 font-medium"
        >
          {t("Läsa mer")}
        </Button>
      </section>
    </div>
    </main>
  );
}
