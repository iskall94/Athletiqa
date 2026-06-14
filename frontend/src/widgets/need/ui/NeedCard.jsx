import { Link } from "react-router-dom";
import ScallopIcon from "../../../shared/ui/icons/ScallopIcon";
import { Finish } from "../../../shared/assets";
import { useTranslation } from "react-i18next";


export default function NeedCard() {
  const { t } = useTranslation();
  return (
    <article className="flex w-[34rem] h-[17rem] rounded-lg bg-bg border border-gray-300 overflow-hidden z-10 mx-auto">
      <div className="w-[46%] h-full p-4 pr-2">
        <img
          src="https://placehold.co/256x256?text=?"
          alt={t("Racket")}
          className="w-full h-full rounded-md object-cover"
        />
      </div>

      <div className="w-[54%] h-full flex flex-col justify-between p-4 pl-2">
        <div>
          {/* Title*/}
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-gray-700 text-xl font-bold leading-7">
              {t("Racket")}
            </h3>

            <span className="text-sm text-gray-500 font-normal leading-5 text-right shrink-0">
              {t("2 månader")}
              <br />
              {t("sedan")}
            </span>
          </div>

          {/* Author */}
          <div className="flex items-center gap-2">
            <img
              src="https://placehold.co/20x20?text=?"
              alt={t("Author")}
              className="h-5 w-5 rounded-full object-cover"
            />

            <span className="text-base text-gray-700 leading-6">
              {t("Adison Vetrovs")}
            </span>
          </div>

          {/*Description*/}
          <p className="mt-3 text-sm text-gray-700 font-normal leading-5 line-clamp-3 ">
            {t("Jag satsar för fullt på min tennis och vill hela tiden ta nästa steg. Men för att kunna spela på min högsta nivå behöver jag..")}
          </p>
        </div>

       
          {/*Progress*/}
        <div>
          <div className="mb-3 mt-2">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                {t("100kr kvar till målet")}
              </span>

              <span className="text-sm text-gray-700"><Finish className="h-4 w-4"/></span>
            </div>

            <div className=" h-[0.25rem] w-full overflow-hidden rounded-full bg-accent-light">
              <div className="h-full w-[65%] rounded-full bg-accent" />
            </div>
          </div>

          {/*Button*/}
          <Link
            to="/register"
            className="
              group relative inline-flex w-full items-center justify-center
              overflow-hidden py-2 px-5 rounded-xl gap-2.5
              bg-primary text-bg
            "
          >
            <span className="absolute inset-x-0 bottom-0 z-0 h-[180%] translate-y-full transition-transform duration-600 ease-out group-hover:translate-y-[3%]">
              <ScallopIcon className="absolute left-0 top-0 w-full h-auto text-accent" />
              <span className="absolute inset-x-0 bottom-0 h-[50%] bg-accent" />
            </span>

            <span className="relative z-10 transition-colors duration-500 group-hover:text-primary">
              {t("Läs mer")}
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}