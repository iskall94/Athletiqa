import { useEffect, useState } from 'react';
import { listCampaigns, CampaignCard } from '../../../enteties/campaign';
import { useTranslation } from 'react-i18next';

export function CampaignList() {
    const { t } = useTranslation();
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        listCampaigns().then(setCampaigns);
    }, []);

    if (campaigns.length === 0) {
        return <p className="text-center text-gray-500 mt-8">{t("Inga donationer hittades.")}</p>;
    }

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {campaigns.map(c => (
                    <CampaignCard key={c.campaignId} campaign={c} />
                ))}
            </div>
        </div>
    );
}