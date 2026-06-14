import { aboutValuesDtata } from "../model/aboutValuesData";
import BallsBackGround from "../../../shared/assets/balls-background.svg?url";
import { useTranslation } from "react-i18next";

export default function AboutValuesSection() {
  const { t } = useTranslation();
  const { title, description, values } = aboutValuesDtata;
  return (
    <section className="mt-20 md:mt-32 lg:mt-50 relative overflow-hidden pb-20 md:pb-32 lg:pb-40">
      <div className="relative z-10 mx-auto max-w-[80rem] px-6">
        <h2 className="text-primary text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight lg:leading-[4rem] self-stretch ">
          {t(title)}
        </h2>
        <p className="mt-[2.25rem] text-gray-700 max-w-[68rem] text-base font-normal leading-6">
          {t(description)}
        </p>
      </div>

      <div className="mt-12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[77rem] px-6 lg:px-0 z-10">
        {values.map((item) => (
          <article
            key={item.title}
            className=" flex min-h-[16rem] flex-col items-center justify-center rounded-xl bg-accent-light px-8 py-8 text-center  z-10"
          >
            <h3 className="text-xl font-bold leading-7  text-primary">
              {t(item.title)}
            </h3>
            <p className="mt-[2.25rem] max-w-[17rem] text-gray-700 text-base font-normal leading-6  z-10">
              {t(item.description)}
            </p>
          </article>
        ))}
      </div>

      <div
        aria-hidden="true"
        style={{
          backgroundImage: `url("${BallsBackGround}")`,
        }}
        className="absolute inset-x-0 top-0 h-[80rem] pointer-events-none z-0 bg-no-repeat bg-[length:100%_auto] bg-[position:center_18rem]"
      />
    </section>
  );
}
