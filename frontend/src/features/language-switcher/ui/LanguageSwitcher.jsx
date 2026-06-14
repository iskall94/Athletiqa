import { useState } from "react";
import Button from "../../../shared/ui/button/Button";
import globenIcon from "../../../shared/assets/globe.svg?url";
import downArrow from "../../../shared/assets/chevron-down.svg?url";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();
  const languages = ["sv", "en"];
  const selectedLanguage = i18n.language === "en" ? "Eng" : "Swe";

  return (
    <div className="relative inline-block ">
      <Button
        variant="none"
        onClick={() => setIsOpen(!isOpen)}
        className={`px-4 py-2 bg-White rounded border-2 border-gray-300 
        inline-flex justify-start items-center gap-3 overflow-hidden transition-colors ${isOpen ? "!border-accent" : "border-gray-300 hover:border-primary"}`}
      >
        <img src={globenIcon} alt="" aria-hidden="true" className="w-5 h-5" />
        <span className="w-5 h-5 inline-flex  text-base items-center justify-center font-normal font-['Karla'] leading-6">
          {selectedLanguage}
        </span>
        <img
          src={downArrow}
          alt="test"
          aria-hidden="true"
          className={`w-5 h-5 transition-transform transition duration-500 ${isOpen ? "rotate-180 " : ""}`}
        />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-full bg-bg border border-gray-300 rounded z-50">
          {languages
            .filter((language) => language !== i18n.language)
            .map((language) => (
              <Button
                variant="none"
                key={language}
                onClick={() => {
                  i18n.changeLanguage(language);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-black text-base font-normal leding-6 "
              >
            {language === "en" ? "Eng" : "Swe"}
              </Button>
          ))}
        </div>
      )}
    </div>
  );
}
