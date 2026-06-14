import { Link } from "react-router-dom";

import ScallopIcon from "../../../shared/ui/icons/ScallopIcon";

export default function HowItWorksItem({
  title,
  description,
  image,
  imageAlt,
  imagePosition = "right",
  buttons = [],
}) {
  const isImageLeft = imagePosition === "left";
  const hoverFillByVariant = {
    primary: {
      fill: "text-accent",
      bg: "bg-accent",
      textHover: "group-hover:text-primary",
      buttonBg: "bg-primary",
      buttonStartText: "text-bg",
    },
    accent: {
      fill: "text-primary",
      bg: "bg-primary",
      textHover: "group-hover:text-bg",
      buttonBg: "bg-accent",
      buttonStartText: "text-primary",
    },
  };

  const imageBlock = (
    <div
      className={`
        ${
        isImageLeft
          ? "md:translate-x-[3rem]"
          : "md:-translate-x-[3rem]"
      }
      `}
    >
      <img
        src={image}
        alt={imageAlt}
        className={`
           w-full max-w-full h-auto object-contain
           md:max-w-[36rem]
           lg:max-w-[44.375rem]
        `}
      />
    </div>
  );

  const textBlock = (
    <div
      className={`w-full max-w-[24rem] flex flex-col items-start gap-6 mx-auto `}
    >
      <h2 className="text-gray-700 md:text-3xl font-semibold md:leading-10 max-w-[24rem]">
        {title}
      </h2>
      <p className="text-gray-700 text-base font-normal  mb-2 leading-6">
        {description}
      </p>

      {buttons?.length > 0 && (
        <div className="flex gap-4">
          {buttons.map((button) => {
            const hover =
              hoverFillByVariant[button.variant] ?? hoverFillByVariant.primary;
            return (
              <Link
                key={button.id}
                to={button.to}
                size="tab"
                variant={button.variant}
                className={` group relative inline-flex
                  items-center justify-center overflow-hidden
                  py-2.5 px-5 md:py-3 md:px-6
                  rounded-lg md:rounded-xl gap-2.5
                  text-sm md:text-base font-semibold ${hover.buttonBg} ${hover.buttonStartText}`}
              >
                <span className="absolute inset-x-0 bottom-0 z-0 h-[180%] translate-y-full transition-transform duration-700 ease-out group-hover:translate-y-[20%] ">
                  <ScallopIcon
                    className={`absolute left-0 top-0 w-full h-auto ${hover.fill}`}
                  />
                  <span
                    className={`absolute inset-x-0 bottom-0 h-[75%] ${hover.bg}`}
                  />
                </span>
                <span
                  className={`relative z-10 transition-colors duration-700 ${hover.textHover} `}
                >
                  {button.text}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );

  return (
    <div className="relative z-10">
      <div
        className={`
           flex flex-col gap-6 md:gap-0
           md:grid md:grid-cols-2 md:items-center
        `}
      >
        <div className={isImageLeft ? "md:order-1" : "md:order-2"}>
          {imageBlock}
        </div>
        <div className={isImageLeft ? "md:order-2" : "md:order-1"}>
          {textBlock}
        </div>
      </div>
    </div>
  );
}
