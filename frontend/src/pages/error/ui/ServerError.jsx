import { ServerErrorBackGround } from "../../../shared/assets";
import { Link } from "react-router-dom";
import ScallopIcon from "../../../shared/ui/icons/ScallopIcon";
import { useTranslation } from "react-i18next";

export default function ServerError() {
  const { t } = useTranslation();
  return (
    <main className="flex justify-center bg-bg items-center min-h-screen pb-[5rem]"  style={{
        backgroundImage: `url("${ServerErrorBackGround}")`,
        backgroundSize: "100% auto",
        backgroundPosition: "center ",
        backgroundRepeat: "no-repeat",
      }}>
    

      <div className="mx-auto max-w-[70rem] flex flex-col items-center justify-center text-center mt-50 py-15 px-7 z-10 relative overflow-hidden">
        <h1 className="text-gray-700  text-5xl font-extrabold leading-[4rem]  text-nowrap">
          {t("🏋️ 500 – Tekniskt fel i omklädningsrummet")}
        </h1>
        <p className="mt-[2.25rem] text-gray-700 text-xl font-normal leading-8  max-w-[44rem]">
         {t("Systemet har fått kramp – vi jobbar på att stretcha ut problemet. Ge oss en stund att återhämta oss, så är vi snart redo för nästa halvlek. Tack för tålamodet, lagkamrat!")}
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
            {t("Gå tillbaka till startsidan")}
          </span>
        </Link>
      </div>
    </main>
  );
}
