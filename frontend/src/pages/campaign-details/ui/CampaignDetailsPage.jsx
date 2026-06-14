import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCampaignById, CampaignDetailProgress } from '../../../enteties/campaign';
import { DonationsList } from "../../../enteties/donation";
import { Button } from "../../../shared/ui/button";
import { CampaignForm } from "../../../features/donate-to-campaign";
import { useTranslation } from "react-i18next";

export default function CampaignDetailsPage() {
    const { id } = useParams(); // This will get the :id part from the URL, so if we're at /campaign/1, id will be "1".
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [campaign, setCampaign] = useState(null); // We'll store the campaign details here and start with null until we fetch it.
    const [isLoading, setIsLoading] = useState(true); // This will track whether we're still loading the campaign details.
    const [showDonateModal, setShowDonateModal] = useState(false);

    useEffect(() => 
    {
        getCampaignById(id)
            .then(setCampaign)
            .finally(() => setIsLoading(false));
    }, [id]);

    if (isLoading)
    {
        return <div>{t("Loading...")}</div>;
    }

    if (!campaign)
    {
        return <div>{t("Campaign not found.")}</div>;
    }

    const formattedDate = campaign.createdAt
        ? new Date(campaign.createdAt).toLocaleDateString("sv-SE")
        : "Recently created"; // Format date as YYYY-MM-DD or show "Recently created" if no date is available

        return (
        <>
            <main className="w-full flex flex-col items-center gap-8 p-8 text-gray-700 ">
              <article className="w-[80%] flex flex-row flex-wrap gap-8 justify-between ">
                    {/*Left Column: Story */}
                    <article className="w-[60%] rounded-xl">
                        <figure className="campaign-detail__image-wrapper">
                            <img className="border border-gray-300 rounded-xl" src={campaign.mediaUrl} alt="Campaign Header" />
                        </figure>
                        <section className="flex flex-col gap-4 p-2">
                            <header className="flex flex-row justify-between">
                                <h1 className="font-bold text-2xl">{campaign.title}</h1>
                                <time className="campaign-detail__date">{formattedDate}</time>
                            </header>
                            <section className="border-b border-gray-500 pb-2">
                                {/* Placeholder for Profile Picture */}
                                <div className="athlete-avatar-placeholder"></div>
                                <span className="">{campaign.athleteName}<Button className="border border-primary rounded-2xl p-[0.3rem] pl-[1rem] pr-[1rem]">{t("Följ +")}</Button></span> {/*Follow button is just a placeholder for now*/}
                            </section>
                            {/*Posts doesnt have sport*/}
                            {/* <section className="border-b border-gray-500 pb-2">
                                <label className="font-semibold">Sport: </label>
                                <span className="sport-tag">{campaign.sport}</span>
                            </section> */}
                            <section className=" pb-2">
                                <p>{campaign.content}</p>
                            </section>
                        </section>
                    </article>
                    {/*Right Column: Donation Progress*/}
                    <article className=" w-[35%] max-h-[38rem] bg-bg p-4 rounded-xl flex flex-col border border-gray-300 shadow-md ">
                        <section className="flex flex-col gap-2 mb-4 mt-4">
                                <CampaignDetailProgress
                                    current={campaign.currentAmount}
                                    goal={campaign.goalAmount}
                                    showSekFormat={true}
                                />
                                <div className="w-full bg-accent-light rounded-full h-4">
                                    <div className="bg-accent h-4 rounded-full" style={{ width: `${Math.min((campaign.currentAmount / campaign.goalAmount) * 100, 100)}%` }}></div>
                                </div>
                                <p className="mt-4 mb-8">
																	{t("*Det är viktigt för oss att du känner dig trygg när du donerar. Betalningen sker via säkra, certifierade system och dina uppgifter skyddas alltid. Läs mer om hur vi hanterar din donation här.")}
																</p>
                        </section>
                        <section className="w-full flex flex-col items-center gap-4" aria-label="Campaign Actions">
                            <button
                                    className={`w-full p-[0.5rem] text-white rounded-xl transition duration-300 ${
                                        campaign.currentAmount >= campaign.goalAmount? 'bg-gray-500 cursor-not-allowed': 'bg-primary hover:bg-accent hover:text-primary cursor-pointer'}`}
                                        disabled={campaign.currentAmount >= campaign.goalAmount}
                                        onClick={() => {
                                            sessionStorage.setItem("athleteName", campaign.athleteName);
                                            sessionStorage.setItem("campaignId", id);
                                            setShowDonateModal(true);
                                        }}
                                    >
                                      {t(campaign.currentAmount >= campaign.goalAmount ? "Fullt finansierad" : "Donera")}
                                </button>
                            <button className="border border-primary w-full p-[0.5rem] text-primary bg-bg rounded-xl hover:bg-primary-light transition duration-300 cursor-pointer">{t("Dela")}</button>
                        </section>
                        <section className="mt-6 flex flex-col justify-between gap-3">
                            <h3 className="font-semibold">{t("Senaste donationerna:")}</h3>
                            <DonationsList campaignId={id}/>
                        </section>
                    </article>
              </article>
            {/*----------------------------Posts can only have one image as of now, later I will map post images here---------------------------------------*/ }
              <article className="w-[80%] flex flex-col gap-4">
                    <section className="w-full flex flex-row flex-wrap gap-2 border border-gray-300 bg-bg rounded-xl p-4 justify-between">
                        <figure className="w-full sm:w-[48%] lg:w-[30%]">
                            <img className="rounded-xl w-full" src={campaign.mediaUrl} alt="Campaign Header" />
                        </figure>
                        <figure className="w-full sm:w-[48%] lg:w-[30%]">
                            <img className="rounded-xl w-full" src={campaign.mediaUrl} alt="Campaign Header" />
                        </figure>
                        <figure className="w-full sm:w-[48%] lg:w-[30%]">
                            <img className="rounded-xl w-full" src={campaign.mediaUrl} alt="Campaign Header" />
                        </figure>
                    </section>
                    <section className=" w-[6rem] flex flex-row justify-between">
                        <Button className="w-10 h-10 rounded-full border-2 border-primary text-primary bg-transparent cursor-pointer">←</Button>
                        <Button className="w-10 h-10 rounded-full border-2 border-primary text-primary bg-transparent cursor-pointer">→</Button>
                    </section>
                </article>
                <article className="flex flex-row w-[80%]">
                    <article className="border border-gray-300 w-[60%] bg-bg p-4 rounded-xl flex flex-col justify-between">
                        <section className="flex flex-col gap-2 mb-4 mt-4">
                                <CampaignDetailProgress
                                    current={campaign.currentAmount}
                                    goal={campaign.goalAmount}
                                    showSekFormat={true}
                                />
                                <div className="w-full bg-accent-light rounded-full h-4">
                                    <div className="bg-accent h-4 rounded-full" style={{ width: `${Math.min((campaign.currentAmount / campaign.goalAmount) * 100, 100)}%` }}></div>
                                </div>
                        </section>
                        <section className="w-full flex flex-row items-start gap-4" aria-label="Campaign Actions">
                            <button className="border border-primary w-full p-[0.5rem] text-primary bg-bg rounded-xl hover:bg-primary-light transition duration-300 cursor-pointer">{t("Dela")}</button>
                            <section className="w-full">
                                <button
                                    className={`w-full p-[0.5rem] text-white rounded-xl transition duration-300 ${
                                        campaign.currentAmount >= campaign.goalAmount? 'bg-gray-500 cursor-not-allowed': 'bg-primary hover:bg-accent hover:text-primary cursor-pointer'}`}
                                        disabled={campaign.currentAmount >= campaign.goalAmount}
                                        onClick={() => {
                                            sessionStorage.setItem("athleteName", campaign.athleteName);
                                            sessionStorage.setItem("campaignId", id);
                                            setShowDonateModal(true);
                                        }}
                                    >
                                        {campaign.currentAmount >= campaign.goalAmount
                                            ? t("Fullt finansierad")
                                            : t("Donera")}
                                </button>
                                <p className="mt-4">{t("*Det är viktigt för oss att du känner dig trygg när du donerar. Betalningen sker via säkra, certifierade system och dina uppgifter skyddas alltid. Läs mer om hur vi hanterar din donation här.")}</p>
                            </section>
                        </section>
                    </article>
                </article>
            </main>

            {
                showDonateModal && (
                    <div

                        className="fixed inset-0 bg-gray-700/50 flex items-center justify-center z-50"

                        onClick={() => setShowDonateModal(false)}>

                        <div className="relative" onClick={(e) => e.stopPropagation()}>

                            {/* Close Button */}
                            <button
                                className="absolute top-8 right-8 text-2xl font-bold text-gray-500 hover:text-primary cursor-pointer z-50"

                                onClick={() => setShowDonateModal(false)}>✕</button>

                            <CampaignForm campaignId={id} />
                        </div>
                    </div>
                )
            }
        </>
    );
} 