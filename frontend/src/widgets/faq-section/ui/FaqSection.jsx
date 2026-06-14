import { faqData } from "../model/faqData";
import { pageContainer } from "../../../shared/config/layout";
import FaqItem from "./FaqItem";
import faqBackground from "../../../shared/assets/faq-vector.svg?url";
import ScallopIcon from "../../../shared/ui/icons/ScallopIcon";
import { Link } from "react-router-dom";
import { FaqList } from "../";
import { useTranslation } from "react-i18next";

export default function FaqSection() {
  const { t } = useTranslation();
  const homeFaqItems = faqData[0].items;

  return (
    <section className="relative overflow-hidden py-20 md:py-32 md:min-h-screen md:flex md:items-center">
      <div className="absolute  bottom-0 inset-0 z-0  pointer-events-none">
        <img
          src={faqBackground}
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div
        className={`${pageContainer} mx-auto w-full relative z-10 px-5 md:px-4`}
      >
        <div className="grid w-full max-w-[70rem] mx-auto grid-cols-1 md:grid-cols-[0.85fr_1.15fr] gap-6 md:gap-16 items-start">
          <h2 className="text-3xl md:text-5xl max-w-[22rem] font-extrabold text-primary leading-[3rem] md:leading-[4rem]">
            {t("Vanliga frågor & svar")}
          </h2>

          <div className="w-full max-w-none md:max-w-[50rem] flex flex-col items-start gap-8 md:gap-0">
            <FaqList items={homeFaqItems} />
            <Link
              to="/faq"
              className="
                 group relative inline-flex text-xl items-center justify-center overflow-hidden
                 py-4 px-9 rounded-xl gap-2.5 bg-primary text-bg
                 md:max-w-[10rem]"
            >
              <span className="absolute inset-x-0 bottom-0 z-0 h-[180%] translate-y-full transition-transform duration-600 ease-out group-hover:translate-y-[20%]">
                <ScallopIcon className="absolute left-0 top-0 w-full h-auto text-accent" />
                <span className="absolute inset-x-0 bottom-0 h-[75%] bg-accent" />
              </span>

              <span className="relative z-10 transition-colors duration-500 group-hover:text-primary">
                {t("Se mer")}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
