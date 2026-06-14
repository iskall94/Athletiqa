import {useGetDonations} from "../model/useGetDonations";

export default function DonationsList({campaignId})
{
    const {donations, error, isLoading} = useGetDonations(campaignId);

    if(isLoading)
    {
        return <p>Laddar donationer...</p>
    }

    if(error)
    {
        return <p>Error: {error}</p>
    }

    return (
        <div className="flex flex-col gap-4">
            {donations.slice(0, 3).map((donation) => ( // Display only the 3 most recent donations
                <p key={`${donation.createdAt}-${donation.amount}`}>{donation.donorName ? donation.donorName : "Anonym"} - {donation.amount} kr</p> //If no donorName - set donorName to "Anonym"
            ))}
        </div>
    );
}