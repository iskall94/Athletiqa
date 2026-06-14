import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "../../../features/language-switcher";
import settingsIcon from "../assets/settingsIcon.svg?url";
import bellIcon from "../assets/bellIcon.svg?url";
import ScallopIcon from "../../../shared/ui/icons/ScallopIcon";
import { useAuth } from "../../../shared/lib/useAuth";
import { useMessageStore } from "../../../shared/model/useMessageStore";
import { Button } from "../../../shared/ui/button";
import { useState } from "react";
import { XIcon } from "../../../shared/assets";

export default function Header({ variant = "default" }) {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const { openChat } = useMessageStore();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const isCompact = variant === "compact";
  return (
    <header className="w-full relative z-20">
      {/* Mobile top bar */}
      <div className="flex items-center justify-between bg-bg px-5 pt-10 pb-4 md:hidden">
        <Link
          to="/"
          className="font-bold text-xl text-Dark uppercase no-underline font-['Karla']"
        >
          Athletiqa
        </Link>

        <Button
          variant="none"
          aria-label={isMenuOpen ? t("Stäng menu") : t("Öppna menu")}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="flex size-6 items-center justify-center p-0"
        >
          {isMenuOpen ? (
            <XIcon className="w-4 h-4 text-gray-700" />
          ) : (
            <span className="flex flex-col gap-[0.25rem]">
              <span className="block h-[0.125rem] w-5 bg-gray-700" />
              <span className="block h-[0.125rem] w-5 bg-gray-700" />
              <span className="block h-[0.125rem] w-5 bg-gray-700" />
            </span>
          )}
        </Button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="absolute left-1/2 top-0 z-[60] w-full max-w-[25rem]  -translate-x-1/2 bg-bg px-5 pt-10 pb-4 md:hidden">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              onClick={closeMenu}
              className="font-bold text-xl text-Dark uppercase no-underline font-['Karla']"
            >
              Athletiqa
            </Link>

            <Button
              variant="none"
              size="icon"
              aria-label={t("Stäng menu")}
              onClick={closeMenu}
              className="flex size-6 items-center justify-center p-0"
            >
              <XIcon className="w-4 h-4 text-gray-700" />
            </Button>
          </div>

          <div className="mt-7 w-full  [&>*]:w-full [&_button]:w-full [&_button]:justify-between">
            <LanguageSwitcher  />
          </div>

          <nav className="mt-7 flex w-full flex-col items-center gap-2">
            <Link
              to="/explore"
              onClick={closeMenu}
              className="w-full px-10 py-3 text-center text-base font-medium text-gray-700 no-underline"
            >
              {t("Utforska")}
            </Link>

            <Link
              to="/about-us"
              onClick={closeMenu}
              className="w-full px-10 py-3 text-center text-base font-medium text-gray-700 no-underline"
            >
              {t("Om Oss")}
            </Link>
          </nav>

          <div className="mt-7 flex w-full flex-col gap-4">
            <Link
              to="/register"
              onClick={closeMenu}
              className="w-full rounded-xl bg-primary px-8 py-3 text-center text-lg font-semibold leading-6 text-bg no-underline"
            >
              {t("Skapa konto")}
            </Link>

            <Link
              to="/login"
              onClick={closeMenu}
              className="w-full rounded-xl border border-primary px-8 py-3 text-center text-lg font-semibold leading-6 text-primary no-underline"
            >
              {t("Logga in")}
            </Link>
          </div>
        </div>
      )}
      <div className="hidden w-full px-8 py-4  md:block">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <LanguageSwitcher />

            <Link
              to="/explore"
              className="text-gray-700 text-base font-medium leading-5 no-underline
            relative w-fit self-center font-normal leading-4 font-heading
            transition-colors duration-500 ease-out hover:text-primary
            after:absolute after:left-0 after:-bottom-1
                after:h-[0.125rem] after:w-full after:origin-center after:scale-x-0 
                after:bg-primary after:rounded-full
                after:transition-transform after:duration-500 after:ease-out
                hover:after:scale-x-100
            "
            >
              {t("Utforska")}
            </Link>
            <Link
              to="/about-us"
              onClick={closeMenu}
              className="text-gray-700 text-base font-medium leading-5 no-underline relative w-fit self-center font-normal leading-4 font-heading
            transition-colors duration-500 ease-out hover:text-primary
            after:absolute after:left-0 after:-bottom-1
            after:h-[0.125rem] after:w-full after:origin-center after:scale-x-0 
            after:bg-primary after:rounded-full
            after:transition-transform after:duration-500 after:ease-out
            hover:after:scale-x-100"
            >
              {t("Om Oss")}
            </Link>
          </div>

          <Link
            to="/"
            className="font-bold text-xl text-Dark uppercase no-underline font-['Karla']"
          >
            Athletiqa
          </Link>

          {!isCompact ? (
            isAuthenticated ? (
              <div className="flex items-center gap-6">
                <Button
                  variant="none"
                  onClick={() => openChat('aviseringar')}
                  className="cursor-pointer"
                >
                  <img
                    src={bellIcon}
                    alt={t("bellIcon")}
                    aria-hidden="true"
                    className="w-10 h-10"
                  />
                </Button>
                <Link
                  to="/athlete-profile"
                  className="no-underline inline-flex py-2 px-5 rounded-xl gap-2.5 overflow-hidden bg-primary text-white"
                >
                  {t("Min profil")}
                </Link>
                <Link to="/settings">
                  <img
                    src={settingsIcon}
                    alt={t("settingsIcon")}
                    aria-hidden="true"
                    className="w-10 h-10"
                  />
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <Link
                  to="/login"
                  className="text-gray-700 text-base font-medium leading-5 no-underline
                relative w-fit self-center font-normal leading-4 font-heading
                transition-colors duration-500 ease-out hover:text-primary
                after:absolute after:left-0 after:-bottom-1
                after:h-[0.125rem] after:w-full after:origin-center after:scale-x-0 
                after:bg-primary after:rounded-full
                after:transition-transform after:duration-500 after:ease-out
                hover:after:scale-x-100"
                >
                  {t("Logga in")}
                </Link>
                <Link
                  to="/register"
                  className="
                group relative inline-flex items-center justify-center overflow-hidden
                py-2 px-5 rounded-xl gap-2.5 bg-primary text-bg"
                >
                  <span className="absolute inset-x-0 bottom-0 z-0 h-[180%] translate-y-full transition-transform duration-600 ease-out group-hover:translate-y-[20%]">
                    <ScallopIcon className="absolute left-0 top-0 w-full h-auto text-accent" />
                    <span className="absolute inset-x-0 bottom-0 h-[75%] bg-accent" />
                  </span>

                  <span className="relative z-10 transition-colors duration-500 group-hover:text-primary">
                    {t("Skapa Konto")}
                  </span>
                </Link>
              </div>
            )
          ) : (
            <div className="w-[12rem]" />
          )}
        </nav>
      </div>
    </header>
  );
}