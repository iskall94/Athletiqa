import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card } from "../../../shared/ui/card";
import { Button } from "../../../shared/ui/button";
import { confirmEmailVerification } from "../api/authApi";
import { useTranslation } from "react-i18next";

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");
  const hasValidParams = Boolean(userId && token);

  const [status, setStatus] = useState(hasValidParams ? "loading" : "error");
  const [errorMessage, setErrorMessage] = useState(
    hasValidParams ? "" : t("Verifieringslänken är ogiltig.")
  );

  useEffect(() => {

    if (!hasValidParams) {
      return;
    }
    
    let isCurrentRequest = true;

    async function verify() {
      try {
        await confirmEmailVerification(userId, token);
        if (isCurrentRequest) {
        setStatus("success");
        }
      } catch (err) {
        if (isCurrentRequest) {
        setStatus("error");
        // If server throws a generic network error message, use a translated fallback string
        setErrorMessage(err.message || t("Kunde inte ansluta till servern. Försök igen senare."));
        }
      }
    } 
    verify();
    return () => {
      isCurrentRequest = false;
    };
  }, [userId, token, hasValidParams, t]);

  return (
    <main className="flex justify-center items-center min-h-screen bg-bg">
      <Card className="w-[30rem] p-8 text-center flex flex-col items-center gap-6">
        
        {status === "loading" && (
          <>
            <h1 className="text-2xl font-bold text-primary animate-pulse">
              {t("Verifierar ditt konto...")}
            </h1>
            <p className="text-gray-500">
              {t("Vänligen vänta medan vi bekräftar din e-postadress.")}
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <h1 className="text-2xl font-bold text-primary">
              {t("E-postadressen bekräftad!")}
            </h1>
            <p className="text-gray-700">
              {t("Ditt konto är nu aktiverat och klart. Välkommen till Athletiqa-laget!")}
            </p>
            <Button 
              onClick={() => navigate("/login")}
              className="w-full bg-primary text-white font-semibold py-3 mt-2 rounded-xl"
            >
              {t("Gå till logga in")}
            </Button>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="text-2xl font-bold text-error">
              {t("Verifieringen gick inte igenom.")}
            </h1>
            <p className="text-gray-700 bg-error-light/20 p-3 rounded-lg text-sm border border-error/20">
              {t("Felmeddelande: {{errorMessage}}", { errorMessage })}
            </p>
            <Button 
              onClick={() => navigate("/register")}
              className="w-full bg-primary text-white font-semibold py-3 mt-2 rounded-xl"
            >
              {t("Tillbaka till registrering")}
            </Button>
          </>
        )}

      </Card>
    </main>
  );
}

export default VerifyEmail;