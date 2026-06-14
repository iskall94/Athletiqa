import { Link, Form, useActionData } from 'react-router-dom';
import { Button } from "../../../shared/ui/button";
import { FormField } from "../../../shared/ui/input";
import { Card } from "../../../shared/ui/card";
import RegisterFormBackGround from "../../../shared/assets/registerformAndlogin-background.svg?url";
import ScallopIcon from "../../../shared/ui/icons/ScallopIcon";
import { useState } from 'react';
import { useTranslation } from "react-i18next";

export default function ForgotPasswordForm() {
  const { t } = useTranslation();
  const actionData = useActionData();
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);

  // Simple client-side check to match your validation structure
  const isEmailValid = email.includes("@") && email.includes(".");

  return (
    <main className="flex justify-center bg-bg items-start min-h-screen pb-[5rem]">
      <div
        style={{
          backgroundImage: `url("${RegisterFormBackGround}")`,
        }}
        className="absolute inset-x-0 top-0 h-[50rem] pointer-events-none z-0 bg-no-repeat bg-[length:100%_auto]"
      />

      <Card className="w-[36.875rem] py-9 px-7 z-10 relative overflow-hidden">
        <div className="text-center">
          <h1 className="text-3xl leading-9 text-gray-700 font-bold">
            {t("Återställ lösenord")}
          </h1>
          <p className="text-base text-gray-500 font-normal leading-6 mt-2">
            {t("Ange din e-postadress så skickar vi en länk för att välja ett nytt lösenord.")}
          </p>
        </div>

        {/* Success Feedback Banner */}
        {actionData?.success ? (
          <div className="mt-6 mx-5 p-4 bg-bg border border-success rounded-xl text-center">
            <p className="text-sm text-success font-medium">
              {t("Ett återställningslänk har skickats till din e-post om adressen finns registrerad. Kontrollera din Mailpit inkorg!")}
            </p>
            <div className="mt-4">
              <Link to="/login" className="text-sm font-semibold text-primary underline">
                {t("Tillbaka till logga in")}
              </Link>
            </div>
          </div>
        ) : (
          <Form method="post" noValidate className="bg-bg mt-[2.25rem] px-5 py-3">
            {actionData?.error && (
              <p className="text-xs text-red-500 mb-2 ml-2">{actionData.error}</p>
            )}

            <FormField
              label={t("E-postadress")}
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              labelClassName="ml-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched(true)}
              touched={touched}
              error={touched && !isEmailValid ? t("Ange en giltig e-postadress") : ""}
              isValid={touched && isEmailValid}
              required
            />

            <Button
              variant="none"
              type="submit"
              disabled={!isEmailValid}
              className="group relative overflow-hidden w-full bg-primary text-bg text-lg font-semibold leading-6 mt-[2rem] disabled:opacity-50"
            >
              <span className="absolute inset-x-0 bottom-0 z-0 h-[9rem] translate-y-full transition-transform duration-1000 ease-out group-hover:translate-y-[1.2rem]">
                <ScallopIcon className="absolute left-0 z-10 w-full h-auto top-0 text-accent" />
                <span className="absolute inset-x-0 bottom-0 z-0 h-[4.5rem] bg-accent" />
              </span>

              <span className="relative z-10 transition-colors duration-500 group-hover:text-primary">
                {t("Skicka återställningslänk")}
              </span>
            </Button>

            <p className="mt-4 text-center">
              <Link to="/login" className="text-gray-500 text-sm font-normal underline underline-offset-8">
                {t("Avbryt och gå tillbaka")}
              </Link>
            </p>
          </Form>
        )}
      </Card>
    </main>
  );
}