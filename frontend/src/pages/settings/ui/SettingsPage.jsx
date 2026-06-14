import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SettingsSidebar } from "../../../widgets/settings-sidebar";
import {
    ProfileSettingsForm,
    NotificationSettingsForm,
    SecuritySettingsForm,
    GuardianSettingsForm,
    HelpSection,
} from "../../../features/update-settings";
import { useTranslation } from "react-i18next";

const container = "max-w-[75rem] mx-auto px-4 md:px-8";

// Title shown in the mobile sub-header when each section is open
const SECTION_LABELS = {
    profil: "Profilinställningar",
    aviseringar: "Aviseringar",
    sakerhet: "Säkerhet",
    vardnadshavare: "Vårdnadshavare",
    hjalp: "Hjälp",
};

export default function SettingsPage() {
    const { t } = useTranslation();

    // Mobile uses a drill-in pattern: sidebar shows until a section is tapped,
    // then sidebar hides and the section takes over. Desktop shows both at once.
    const [isDesktop, setIsDesktop] = useState(() =>
        typeof window === "undefined"
            ? true
            : window.matchMedia("(min-width: 1024px)").matches,
    );
    const [activeSection, setActiveSection] = useState(isDesktop ? "profil" : null);

    useEffect(() => {
        const mql = window.matchMedia("(min-width: 1024px)");
        const handler = (e) => {
            setIsDesktop(e.matches);
            if (e.matches) {
                setActiveSection((current) => current ?? "profil");
            }
        };
        mql.addEventListener("change", handler);
        return () => mql.removeEventListener("change", handler);
    }, []);

    const sectionContent = {
        profil: <ProfileSettingsForm />,
        aviseringar: <NotificationSettingsForm />,
        sakerhet: <SecuritySettingsForm />,
        vardnadshavare: <GuardianSettingsForm />,
        hjalp: <HelpSection />,
    };

    const showSidebar = isDesktop || activeSection === null;
    const showContent = isDesktop || activeSection !== null;
    const mobileTitle = activeSection
        ? t(SECTION_LABELS[activeSection])
        : t("Inställningar");

    return (
        <div className="min-h-screen flex flex-col bg-bg">
            <main className="flex-1 flex flex-col">
                {/* Desktop breadcrumb */}
                <nav
                    className={`${container} pt-8 hidden lg:flex items-center gap-2 text-sm text-gray-700`}
                >
                    <Link to="/" className="hover:underline">
                        Start
                    </Link>
                    <span>/</span>
                    <span>{t("Inställningar")}</span>
                </nav>

                {/* Mobile sub-header: back arrow + page title */}
                <div
                    className={`${container} pt-6 grid grid-cols-[2.5rem_1fr_2.5rem] items-center gap-2 lg:hidden`}
                >
                    {activeSection !== null ? (
                        <button
                            type="button"
                            onClick={() => setActiveSection(null)}
                            aria-label={t("Tillbaka")}
                            className="inline-flex items-center justify-center w-10 h-10 text-primary text-2xl leading-none no-underline cursor-pointer"
                        >
                            ←
                        </button>
                    ) : (
                        <Link
                            to="/"
                            aria-label={t("Tillbaka")}
                            className="inline-flex items-center justify-center w-10 h-10 text-primary text-2xl leading-none no-underline"
                        >
                            ←
                        </Link>
                    )}
                    <span className="text-sm font-bold text-primary text-center">
                        {mobileTitle}
                    </span>
                    <div aria-hidden="true" />
                </div>

                <section
                    className={`${container} pt-6 lg:pt-8 pb-16 flex flex-col lg:flex-row gap-6 lg:gap-10 items-start`}
                >
                    {showSidebar && (
                        <aside className="w-full lg:w-72 flex-shrink-0">
                            <SettingsSidebar
                                active={activeSection}
                                onChange={setActiveSection}
                            />
                        </aside>
                    )}

                    {showContent && activeSection && (
                        <div className="flex-1 min-w-0 w-full">
                            {sectionContent[activeSection]}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}