import { Link } from "react-router-dom";
import { infoHighlightData } from "../model/infoHighlightData";
import  ScallopIcon  from "../../../shared/ui/icons/ScallopIcon";
import { pageContainer } from "../../../shared/config/layout";
import { InfoHighlightBackground } from "..";
import { useTranslation } from "react-i18next";

export default function InfoHighlight({
  title,
  description,
  image,
  imageAlt,
  linkTo,
  backgroundText,
  textVariant,
  backgroundImage,
}) {
  const { t } = useTranslation();
  return (
    <section className="py-15 mt-[20rem] pb-[12rem] relative overflow-hidden">
       
        <InfoHighlightBackground image={backgroundImage} backgroundText={backgroundText} textVariant={textVariant}/>
     
     
      <div className={`mx-auto px-4 pt-[5rem] ${pageContainer} `}>
        <div className="grid grid-cols-[0.85fr_1.15fr] justify-center items-center gap-17  z-10 relative">
          <div className="max-w-[30rem] lexf flex-col items-start gap-6">
            <h2 className="text-3xl font-semibold text-gray-700 leading-10">
              {title}
            </h2>
            <p className="text-gray-700 text-base font-normal leading-6">
              {description}
            </p>
            <Link
              to={linkTo}
              className="
            group relative inline-flex items-center justify-center overflow-hidden
              py-3 px-8 rounded-xl gap-2.5 overflow-hidden bg-primary text-bg mt-[2rem]"
            >
              <span className="absolute inset-x-0 bottom-0 z-0 h-[180%] translate-y-full transition-transform duration-600 ease-out group-hover:translate-y-[20%]">
                <ScallopIcon className="absolute left-0 top-0 w-full h-auto text-accent" />
                <span className="absolute inset-x-0 bottom-0 h-[75%] bg-accent" />
              </span>

              <span className="relative z-10 transition-colors duration-500 group-hover:text-primary ">
                {t("Läs mer")}
              </span>
            </Link>
          </div>
          <div className="flex items-center justify-end ">
            <img
              src={image}
              alt={imageAlt}
              className="w-[200%] max-w-[44.375rem] h-auto object-contain translate-x-[6rem]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
