import heroWave from "../../../shared/assets/hero-vector.svg?url";
import { pageContainer } from "../../../shared/config/layout";
import { Button } from "../../../shared/ui/button";
import ScallopIcon from "../../../shared/ui/icons/ScallopIcon";
import { ArrowDownIcon } from "../../../shared/ui/icons";
import videoUnion from "../../../shared/assets/video-union.svg?url";
import { HomePageVideo } from "../../../shared/assets";
import { useTranslation } from "react-i18next";

export default function LandingHero() {
  const { t } = useTranslation();
  return (
    <section className="relative  w-full  md:py-12 md:pb-[40vw]">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={heroWave}
          alt=""
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Hero — large text above full-width video */}
      <div className="relative z-10 pt-[3rem]  md:mt-10">
        <div className={`${pageContainer}`}>
          <h1 className="font-heading font-extrabold text-primary text-3xl leading-9 md:text-[3rem] md:leading-[4rem] max-w-[42rem]">
            {t("Bli hjälten bakom nästa generations sportdrömmar")}
          </h1>
          <div className="flex flex-col md:flex-row items-start gap-4 mt-8 mb-10">
            <Button
              variant="none"
              className="group !text-base md:!text-base relative justify-center overflow-hidden py-3 px-6 md:py-3 md:px-6 rounded-xl bg-accent text-primary font-semibold cursor-pointer"
            >
              <span className="absolute inset-x-0 bottom-0 z-0 h-[180%] translate-y-full transition-transform duration-600 ease-out group-hover:translate-y-[20%]">
                <ScallopIcon className="absolute left-0 top-0 w-full h-auto text-primary" />
                <span className="absolute inset-x-0 bottom-0 h-[75%] bg-primary" />
              </span>

              <span className="relative z-10 transition-colors duration-500 group-hover:text-bg">
                {t("Hjälp en ung atlet")}
              </span>
            </Button>
            <Button
              variant="none"
              className="inline-flex !text-base md:!text-base items-center gap-3 text-primary font-semibold leading-6
               py-3 px-6 md:py-3 md:px-6 rounded-xl border md:border-2 cursor-pointer transition-colors duration-500 ease-in-out
               bg-transparent border-primary hover:bg-primary-light hover:border-transparent"
            >
              {t("Läs mer")}{" "}
              <ArrowDownIcon className="w-[1.5rem] h-[1.5rem] text-primary" />
            </Button>
          </div>
        </div>
        <div className="relative mt-10 md:mt-[4rem]">
          <div
            className="
                mx-auto 
                w-[94%] md:w-[98.5%] 
                h-[28rem] sm:h-[32rem] md:h-[40rem]
                overflow-hidden relative rounded-t-[1.25rem]
                [--mask-main-height:calc(100%_-_4rem)]
                [--mask-wave-size:120px_72px]

                md:[--mask-main-height:calc(100%_-_6.4rem)]
                md:[--mask-wave-size:175px_106px]"
            style={{
              WebkitMaskImage: `linear-gradient(#000 0 0), url("${videoUnion}")`,
              maskImage: `linear-gradient(#000 0 0), url("${videoUnion}")`,

              WebkitMaskSize: `100% var(--mask-main-height), var(--mask-wave-size)`,
              maskSize: `100% var(--mask-main-height), var(--mask-wave-size)`,

              WebkitMaskPosition: "top, left 0 bottom",
              maskPosition: "top, left 0 bottom",

              WebkitMaskRepeat: "no-repeat, round",
              maskRepeat: "no-repeat, round",
            }}
          >
            <video
              className="absolute inset-0 w-full h-full scale-[1.25] md:scale-[2] origin-center object-cover object-center"
              src={HomePageVideo}
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>

        <div className="relative ml-auto max-w-[40rem] mt-24 px-5 md:mt-[9rem] md:px-20 md:translate-y-[7rem]">
          <h2 className="text-3xl md:text-5xl text-left md:text-right font-bold text-primary mb-4">
            {t("Vilka är vi?")}
          </h2>
          <p className="text-gray-700 text-base font-normal leading-6 text-left md:text-right">
            Athletiqa är plattformen som kopplar samman unga atleter med
            sponsorer och privatpersoner som vill stötta nästa generation. Vi
            tror att talang inte ska begränsas av ekonomi.
          </p>
        </div>
      </div>
    </section>
  );
}
