import { Link, Form, useActionData, useNavigate } from "react-router-dom";
import { Button } from "../../../shared/ui/button";
import { FormField } from "../../../shared/ui/input";
import { Card } from "../../../shared/ui/card";
import RegisterFormBackGround from "../../../shared/assets/registerformAndlogin-background.svg?url";
import ScallopIcon from "../../../shared/ui/icons/ScallopIcon";
import useLoginForm from "../model/useLoginForm";
import { useAuth } from "../../../shared/lib/useAuth";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function LoginForm() {
  const { t } = useTranslation();
  const actionData = useActionData();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    if (actionData?.success && actionData?.userId) {
      login(actionData.userId);
      navigate("/"); // Redirect to home page after successful login
    }
  }, [actionData, login, navigate]);

  const { user, touched, errors, handleSubmit, handleInput } = useLoginForm();

  const getFieldState = (fieldName) => {
    const hasValue = Boolean(user[fieldName]);
    const isTouched = Boolean(touched?.[fieldName]);
    const hasError = Boolean(errors?.[fieldName]);
    
    return {
    touched: isTouched,
    error: errors?.[fieldName] || "",
    isValid: hasValue && isTouched && !hasError,
  };
};

  return (
    <main
      className="flex justify-center bg-bg items-center min-h-screen pb-[5rem]"
      style={{
        backgroundImage: `url("${RegisterFormBackGround}")`,
        backgroundSize: "100% auto",
        backgroundPosition: "center 3rem",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Card className=" w-[36.875rem]  py-9 px-7 z-10 relative overflow-hidden">
        <div className="text-center">
          <h1 className="text-3xl leading-9 text-gray-700 font-bold">
            {t("Logga in")}
          </h1>
          <p className="text-base text-gray-700 font-normal leading-6 mt-2">
            {t("Har du inget konto?")}{" "}
            <a
              href="/register"
              className="text-base font-medium leading-5 underline underline-offset-8 mt-2"
            >
              {t("Skapa konto")}
            </a>
          </p>
        </div>
        <Form method="post" noValidate className="bg-bg mt-[2.25rem] px-5 py-3">
          <FormField
            label={t("E-postadress")}
            type="email"
            name="email"
            id="email"
            labelClassName="ml-2"
            value={user.email}
            onChange={handleInput}
            {...getFieldState("email")}
            required
          />

          <FormField
            label={t("Lösenord")}
            type="password"
            name="password"
            labelClassName="ml-2 mt-[1rem]"
            id="password"
            value={user.password}
            onChange={handleInput}
            {...getFieldState("password")}
            required
          />
          <p className="mt-[0.75rem] ml-2">
            <Link
              to="/forgot-password"
              className="text-gray-700  text-sm font-normal underline underline-offset-8 "
            >
              {t("Glömt lösenord?")}
            </Link>
          </p>
          <Button
            variant="none"
            type="submit"
            className=" group relative overflow-hidden w-full  bg-primary text-bg text-lg font-semibold leading-6 mt-[2rem]"
          >
            <span className="absolute inset-x-0 bottom-0 z-0 h-[9rem] translate-y-full transition-transform duration-1000 ease-out group-hover:translate-y-[1.2rem]">
              <ScallopIcon className="absolute left-0 z-10 w-full h-auto top-0 text-accent" />
              <span className="absolute inset-x-0 bottom-0 z-0 h-[4.5rem] bg-accent" />
            </span>

            <span className="relative z-10 transition-colors duration-500 group-hover:text-primary">
              {t("Logga in")}
            </span>
          </Button>
        </Form>
      </Card>
    </main>
  );
}

export default LoginForm;
