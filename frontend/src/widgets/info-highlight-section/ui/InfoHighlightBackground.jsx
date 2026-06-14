export default function InfoHiglightBackground({
  image,
  backgroundText = "",
  textVariant,
  underText = "",
  underTextVariant = "",
}) {
  return (
    <div className="relative z-10 mb-12 md:mb-16 lg:mb-24">
      <div className="mx-4">
        <div
          style={{ backgroundImage: `url("${image}")` }}
          className="relative w-full bg-no-repeat bg-[length:100%_100%] aspect-[1400/350] lg:aspect-[1400/226]"
        >
          {backgroundText && (
            <h2
              className={`absolute inset-0 flex items-center justify-center px-6 text-center text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold leading-tight lg:leading-[4rem] ${textVariant}`}
            >
              {backgroundText}
            </h2>
          )}
        </div>

        {underText && (
          <p
            className={`mt-6 md:mt-8 mx-auto max-w-[47rem] px-4 text-center text-base font-normal leading-6 ${underTextVariant}`}
          >
            {underText}
          </p>
        )}
      </div>
    </div>
  );
}
