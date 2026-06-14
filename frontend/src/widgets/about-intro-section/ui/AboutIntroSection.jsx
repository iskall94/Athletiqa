import { useEffect, useState } from "react";
import { pageContainer } from "../../../shared/config/layout";
import { aboutInfoData } from "../model/aboutInfoData";
import { useTranslation } from "react-i18next";

export default function AboutIntroSection() {
  const { t } = useTranslation();
  const { hero, problem, solution, video } = aboutInfoData;

  // mask sizes are pixel-based and look broken on small screens — drop them under lg
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(min-width: 1024px)").matches;
  });

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const handler = (e) => setIsDesktop(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const heroMaskStyle = isDesktop
    ? {
        WebkitMaskImage: `url("${hero.video.maskImage}"), linear-gradient(#000 0 0)`,
        maskImage: `url("${hero.video.maskImage}"), linear-gradient(#000 0 0)`,

        WebkitMaskSize: `175px 106px, calc(100% - 87px) 100%`,
        maskSize: `175px 106px, calc(100% - 87px) 100%`,

        WebkitMaskPosition: `left top, 87px top`,
        maskPosition: `left top, 87px top`,

        WebkitMaskRepeat: `repeat-y, no-repeat round`,
        maskRepeat: `repeat-y, no-repeat round`,
      }
    : undefined;

  const solutionMaskStyle = isDesktop
    ? {
        WebkitMaskImage: ` linear-gradient(#000 0 0 ),url("${solution.video.maskImage}")`,
        maskImage: `linear-gradient(#000 0 0 ),url("${solution.video.maskImage}")`,
        WebkitMaskSize: `100% calc(100% - 6rem), 175px 106px`,
        maskSize: `100% calc(100% - 6rem), 175px 106px`,

        WebkitMaskPosition: "top,left 0 bottom",
        maskPosition: "top,left 0 bottom",

        WebkitMaskRepeat: "no-repeat, round",
        maskRepeat: "no-repeat, round",
      }
    : undefined;

  return (
    <section className="relative min-h-screen py-10 md:py-20">
      <div className={`relative z-10 mx-auto  px ${pageContainer}`}>
        <div className="grid grid-cols-1 lg:grid-cols-[0.6fr_1.4fr] items-center gap-8 lg:gap-10">
          <div className="max-w-[75rem]">
            <h1 className="text-primary text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight lg:leading-[4rem]">
              {t(hero.title)}
            </h1>
            <p className="text-gray-700 text-base font-normal leading-6  max-w-full lg:max-w-[25rem] mt-6 lg:mt-[2rem]">
              {t(hero.description)}
            </p>
          </div>

          <div
            className="mx-auto lg:ml-auto lg:translate-x-25 w-full max-w-[28rem] h-56 md:h-72 lg:w-[50rem] lg:max-w-none lg:h-106 overflow-hidden relative rounded-tr-[1.25rem] rounded-b-[1.25rem]"
            style={heroMaskStyle}
          >
            <video
              className="absolute inset-0 w-full h-full scale-[2] origin-center object-cover"
              src={hero.video.src}
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>

        <div className="max-w-[100rem]">
          <div className="mx-auto mt-20 md:mt-32 lg:mt-40 max-w-[96rem]">
            <h2 className="text-3xl md:text-4xl lg:text-5xl whitespace-normal lg:whitespace-nowrap text-left lg:text-center text-primary justify-start  font-extrabold leading-tight lg:leading-[4rem]">
              {t(problem.title)}
            </h2>

            <p className="mt-[2.25rem] mx-auto max-w-[63rem] text-left lg:text-center text-gray-700 text-base font-normal leading-6">
              {t(problem.description)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] mt-20 md:mt-32 lg:mt-50 items-center gap-8 lg:gap-10">
          <div
            className="mx-auto w-full max-w-[28rem] lg:max-w-none lg:-translate-x-30 h-56 md:h-72 lg:h-[35rem] overflow-hidden relative rounded-tl-[1.25rem] rounded-tr-[1.25rem]"
            style={solutionMaskStyle}
          >
             <video
              className="absolute inset-0 w-full h-full scale-[2] origin-center object-cover"
              src={solution.video.src}
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
          <div className="max-w-full lg:max-w-[75rem] lg:-translate-x-5">
            <h1 className="text-primary text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight lg:leading-[4rem] text-left lg:text-right">
              {t(solution.title)}
            </h1>
            <div className="mt-6 lg:mt-8 max-w-full lg:max-w-[48rem] space-y-3 text-left lg:text-right  ">
              {solution.description.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-gray-700 text-base font-normal leading-6"
                >
                  {t(paragraph)}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
