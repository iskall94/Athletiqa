import { Carousel } from "../../../shared/ui/carousel";
import { Button } from "../../../shared/ui/button";
import { LightBulbIcon } from "../../../shared/assets";
import { ShareIcon } from "../../../shared/assets";
import { PenIcon } from "../../../shared/assets";
import { useState } from "react";
import { useMyCampaigns } from "../../../shared/lib";
import { ArrowButton } from "../../../shared/ui/arrow-button";
import { useTranslation } from "react-i18next";

import { CampaignDetailProgress } from "../../../enteties/campaign";

export default function AthleteCurrentCampaign() {
    const [activeArrowButton, setActiveArrowButton] = useState(null);
    const { data } = useMyCampaigns();
    const { t } = useTranslation();

    const campaigns = data ?? [];

    const [activeIndex, setActiveIndex] = useState(0);

    if (!campaigns.length) {
        return null;
    }

    const campaign = campaigns[activeIndex];

    if (!campaign) return null;

    return (
        <article className="w-full h-[30rem] mt-[8rem] flex flex-row justify-center gap-8">

            {/* LEFT SECTION */}
            <section className="w-[50%] flex flex-col">

                <div className="w-full h-[20rem] border border-gray-500 rounded-[0.5rem] flex flex-row justify-between">

                    {/* IMAGE */}
                    <div className="w-[40%] flex items-center p-[1rem]">
                        <figure className="w-full h-full overflow-hidden rounded-[0.5rem]">
                            {campaign.mediaUrl ? (
                                <img
                                    src={campaign.mediaUrl}
                                    alt={t("campaign")}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                                    <p className="text-sm text-gray-500">
                                        {t("Ingen bild")}
                                    </p>
                                </div>
                            )}
                        </figure>
                    </div>

                    {/* CONTENT */}
                    <div className="w-[60%] flex flex-col justify-between p-[1rem]">

                        {/* TITLE */}
                        <section className="flex flex-row justify-between items-center">
                            <h2 className="font-bold text-xl">
                                {campaign.title}
                            </h2>
                            <Button className="text-sm flex flex-row justify-center items-center border rounded gap-1"><PenIcon />
                                {t("Redigera")}
                            </Button>
                        </section>

                        {/* PROGRESS */}
                        <section className="flex flex-col gap-2">

                            <CampaignDetailProgress
                                current={campaign.currentAmount}
                                goal={campaign.goalAmount}
                                showSekFormat={true}
                            />

                            <div className="w-full bg-accent-light rounded-full h-4">
                                    <div className="bg-accent h-4 rounded-full" style={{ width: `${Math.min((campaign.currentAmount / campaign.goalAmount) * 100, 100)}%` }}></div>
                                </div>

                        </section>

                        {/* STATS */}
                        <section className="flex flex-row justify-between">

                            <div className="w-[30%] h-[5rem] flex flex-col items-center justify-center border rounded-[0.5rem]">
                                <h3>{campaign.donationCount}</h3>
                                <p>{t("Donationer")}</p>
                            </div>

                            <div className="w-[30%] h-[5rem] flex flex-col items-center justify-center border rounded-[0.5rem]">
                                <h3>
                                    {/* Calculates when campaign was created */}
                                    {Math.max(
                                        0,
                                        Math.ceil(
                                            (new Date() -new Date(campaign.createdAt)) / 
                                            (1000 * 60 * 60 * 24)
                                        )
                                    )}
                                </h3>
                                <p>{t("Dagar sedan")}</p>
                            </div>

                            <div className="w-[30%] h-[5rem] flex flex-col items-center justify-center border rounded-[0.5rem]">
                                <h3>
                                    {Math.round(campaign.averageDonationAmount)} kr {/*Average number to whole number*/}
                                </h3>
                                <p>{t("Snittgåva")}</p>
                            </div>

                        </section>

                    </div>
                </div>

                {/* NAVIGATION */}
                <div className="flex justify-start gap-4 mt-4">
                    <ArrowButton
                        id="prev"
                        direction="left"
                        activeButton={activeArrowButton}
                        setActiveButton={setActiveArrowButton}
                        onClick={() => {
                            setActiveArrowButton("prev");
                            setActiveIndex((prev) =>
                                prev > 0 ? prev - 1 : campaigns.length - 1
                            );
                        }}
                    />

                    <ArrowButton
                        id="next"
                        direction="right"
                        activeButton={activeArrowButton}
                        setActiveButton={setActiveArrowButton}
                        onClick={() => {
                                setActiveArrowButton("next");
                                setActiveIndex((prev) =>
                                    prev < campaigns.length - 1 ? prev + 1 : 0
                                );
                            }}
                    />

                </div>

            </section>

            {/* RIGHT SECTION */}
            <section className="w-[20%] bg-accent-light flex justify-center rounded-[1rem]">

                <div className="w-[90%] flex flex-col justify-center gap-5">

                    <h2 className="font-bold text-primary text-[1.4rem]">
                        {t("Tips")}
                    </h2>

                    <section className="bg-bg p-[1rem] rounded-[1rem]">
                        <h3 className="font-semibold">
                            {t("Dela en video från träningen")}
                        </h3>
                        <p>
                            {t("Visa upp även din träning, inte bara tävlingar!")}
                        </p>
                    </section>

                    <section className="bg-bg p-[1rem] rounded-[1rem]">
                        <h3 className="font-semibold">
                            {t("Skicka ett tack")}
                        </h3>
                        <p>
                            {t("Personliga tackmeddelanden ökar engagemanget!")}
                        </p>
                    </section>

                    <section className="bg-bg p-[1rem] rounded-[1rem]">

                        <h3 className="font-semibold">
                            {t("Dela på andra plattformar")}
                        </h3>
                        <p>
                            {t("Större spridning ökar chansen till donationer!")}
                        </p>

                        <div className="w-full flex justify-center mt-2">
                            <Button className="w-[95%] flex flex-row justify-center rounded " variant="outline"><ShareIcon />
                                {t("Kopiera länk")}
                            </Button>
                        </div>

                    </section>

                </div>

            </section>

        </article>
    );
}