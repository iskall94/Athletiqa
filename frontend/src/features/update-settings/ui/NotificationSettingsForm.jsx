import { useState } from "react";
import { Switch } from "../../../shared/ui/switch";
import { useTranslation } from "react-i18next";

// All notification settings live in one object so we can send
// the whole thing as one payload when the backend is hooked up
// `master` is the big top toggle that turns email notifs on/off entirely
const initialPrefs = {
    master: true,
    directMessage: true,
    friendFinishedFundraiser: true,
    donationReceived: true,
    postLiked: false,
    postCommented: false,
};

// Each row below the master toggle. Adding a new notification type
// is a one-line change here, no JSX edits are needed
const ROWS = [
    { key: "directMessage", label: "Skicka e-post när jag får ett direktmeddelande" },
    { key: "friendFinishedFundraiser", label: "Skicka e-post när en av mina kamrater har slutfört en insamling" },
    { key: "donationReceived", label: "Skicka e-post när någon har donerat i min insamling" },
    { key: "postLiked", label: "Skicka e-post när någon har gillat mitt inlägg" },
    { key: "postCommented", label: "Skicka e-post när någon har kommenterat mitt inlägg" },
];

export default function NotificationSettingsForm() {
    const [prefs, setPrefs] = useState(initialPrefs);
    const { t } = useTranslation();

    const toggle = (key) => (next) => {
        setPrefs((prev) => ({ ...prev, [key]: next}))
    };

    const masterOff = !prefs.master;

    return (
        <div className="flex flex-col gap-6">
            {/* Heading */}
            <h1 className="hidden lg:block text-2xl font-bold text-primary">{t("Aviseringar")}</h1>

            {/* Master toggle, in its own card */}
            <div className="flex items-center justify-between rounded-lg border border-gray-300 p-4">
                <span className="text-sm text-gray-700">{t("Tillåt e-post aviseringar")}</span>
                <Switch checked={prefs.master} onChange={toggle("master")} />
            </div>

            {/* Individual rows */}
            <div className="flex flex-col gap-4 px-4">
                {ROWS.map((row) => (
                    <div key={row.key} className="flex items-center gap-4">
                        <Switch
                            checked={prefs[row.key]}
                            onChange={toggle(row.key)}
                            disabled={masterOff}
                        />
                        <span className="text-sm text-gray-700">{row.label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}