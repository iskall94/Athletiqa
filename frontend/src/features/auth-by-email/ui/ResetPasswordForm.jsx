import { useSearchParams, Form, useActionData, Link } from 'react-router-dom';
import { Button } from "../../../shared/ui/button";
import { FormField } from "../../../shared/ui/input";
import { Card } from "../../../shared/ui/card";
import RegisterFormBackGround from "../../../shared/assets/registerformAndlogin-background.svg?url";
import ScallopIcon from "../../../shared/ui/icons/ScallopIcon";
import { useState } from 'react';
import { useTranslation } from "react-i18next";

export default function ResetPasswordForm() {
  const { t } = useTranslation();
  const actionData = useActionData();
  const [searchParams] = useSearchParams();
  
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
	// Track touched state for form fields to control when to show validation errorsa
  const [touched, setTouched] = useState({ password: false, confirmPassword: false });

	// Validation copy from backend rules.
	const getPasswordValidationError = (pass) => {
    if (!pass) return t("Lösenord krävs");
    if (pass.length < 8) return t("Lösenordet måste vara minst 8 tecken långt");
    if (!/[A-Z]/.test(pass)) return t("Lösenordet måste innehålla minst en stor bokstav (A-Z)");
    if (!/[a-z]/.test(pass)) return t("Lösenordet måste innehålla minst en liten bokstav (a-z)");
    if (!/[0-9]/.test(pass)) return t("Lösenordet måste innehålla minst en siffra (0-9)");
    if (!/[^a-zA-Z0-9]/.test(pass)) return t("Lösenordet måste innehålla minst ett specialtecken (!@#$ etc.)");
    return "";
  };

  const passwordError = getPasswordValidationError(password);
	const isPasswordValid = passwordError === ""; // Valid if there are no validation errors
  const doPasswordsMatch = password === confirmPassword;

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
            {t("Välj nytt lösenord")}
          </h1>
          <p className="text-base text-gray-500 font-normal leading-6 mt-2">
            {t("Ange ditt nya önskade lösenord nedan för att uppdatera ditt konto ({{email}}).", { email: email })}
          </p>
        </div>

        {actionData?.success ? (
          <div className="mt-6 mx-5 p-4 bg-bg border border-success rounded-xl text-center">
            <p className="text-sm text-success font-medium mb-4">
              {t("Ditt lösenord har ändrats utan problem!")}
            </p>
            <Link to="/login" className="text-base font-semibold text-bg bg-primary px-6 py-2.5 rounded-full hover:bg-primary-light transition-colors inline-block">
              {t("Logga in nu")}
            </Link>
          </div>
        ) : (
          <Form method="post" noValidate className="bg-bg mt-[2.25rem] px-5 py-3">
            {/* Hidden tracking values so they are submitted with the form */}
            <input type="hidden" name="token" value={token} />
            <input type="hidden" name="email" value={email} autoComplete="user" />

            {actionData?.error && (
              <p className="text-xs text-error mb-2 ml-2">{actionData.error}</p>
            )}

            <FormField
              label={t("Nytt Lösenord")}
              type="password"
              name="password"
              id="password"
              labelClassName="ml-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched(t => ({ ...t, password: true }))}
              touched={touched.password}
              error={touched.password && !isPasswordValid ? passwordError : ""}
              isValid={touched.password && isPasswordValid}
							autoComplete="new-password"
              required
            />

            <FormField
              label={t("Bekräfta nytt lösenord")}
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              labelClassName="ml-2 mt-[1rem]"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={() => setTouched(t => ({ ...t, confirmPassword: true }))}
              touched={touched.confirmPassword}
              error={touched.confirmPassword && !doPasswordsMatch ? t("Lösenorden matchar inte varandra") : ""}
              isValid={touched.confirmPassword && isPasswordValid && doPasswordsMatch}
							autoComplete="new-password"
              required
            />

            <Button
              variant="none"
              type="submit"
              disabled={!isPasswordValid || !doPasswordsMatch}
              className="group relative overflow-hidden w-full bg-primary text-gray-100 text-lg font-semibold leading-6 mt-[2rem] disabled:opacity-50"
            >
              <span className="absolute inset-x-0 bottom-0 z-0 h-[9rem] translate-y-full transition-transform duration-1000 ease-out group-hover:translate-y-[1.2rem]">
                <ScallopIcon className="absolute left-0 z-10 w-full h-auto top-0 text-accent" />
                <span className="absolute inset-x-0 bottom-0 z-0 h-[4.5rem] bg-accent" />
              </span>

              <span className="relative z-10 transition-colors duration-500 group-hover:text-primary">
                {t("Spara nytt lösenord")}
              </span>
            </Button>
          </Form>
        )}
      </Card>
    </main>
  );
}