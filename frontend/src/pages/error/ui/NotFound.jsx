import { Link } from "react-router-dom";
import { NotFoundBackGround } from "../../../shared/assets";
import ScallopIcon from "../../../shared/ui/icons/ScallopIcon";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <main className="flex justify-center bg-bg items-center min-h-screen pb-[5rem]"  style={{
        backgroundImage: `url("${NotFoundBackGround}")`,
        backgroundSize: "100% auto",
        backgroundPosition: "center 0.25rem",
        backgroundRepeat: "no-repeat",
      }}>
      <div className="mx-auto max-w-[60rem] flex flex-col items-center text-center mt-50 py-15 px-7 z-10 relative overflow-hidden">
        <h1 className="text-gray-700  text-5xl font-extrabold leading-[4rem]  text-nowrap">
          {t("⚽ 404 – Bollen gick utanför planen")}
        </h1>
        <p className="mt-[2.25rem] text-gray-700 text-xl font-normal leading-8  max-w-[44rem]">
          {t("Oj! Den här sidan verkar ha missat målet. Kanske har länken bytt position eller gått till vila. Ta ett nytt skott från startsidan och fortsätt spelet!")}
        </p>

        <Link
          to="/register"
          className="
                mt-[2.25rem]
              group relative inline-flex items-center justify-center overflow-hidden
              px-8 py-3  rounded-xl gap-2.5 overflow-hidden bg-primary text-bg max-w-[20rem]"
        >
          <span className="absolute inset-x-0 bottom-0 z-0 h-[9rem] translate-y-full transition-transform duration-1000 ease-out group-hover:translate-y-[1.2rem]">
            <ScallopIcon className="absolute left-0 top-0 w-full h-auto text-accent" />
            <span className="absolute inset-x-0 bottom-0 h-[4.5rem] bg-accent" />
          </span>

          <span className="relative z-10 transition-colors duration-500 group-hover:text-primary">
            {t("Gå tillbaka till stratsidan")}
          </span>
        </Link>
      </div>
    </main>
  );
}
