import {useState, useEffect} from "react";
import { getDonations } from "../api/getDonations";

const useGetDonations = (campaignId) => 
    {
        const [donations, setDonations] = useState([]);
        const [error, setError] = useState("");
        const [isLoading, setIsLoading] = useState(false);

        useEffect(() => {
            const fetchDonations = async () => {
                setIsLoading(true)
                try{
                    const data = await getDonations(campaignId);
                    // console.log(data);
                    setDonations(data);
                    setIsLoading(false);
                    
                }
                catch(error)
                {
                    setError(error.message);
                    setIsLoading(false);
                }
            }
            fetchDonations();
        }, [campaignId]);
            
        return {donations, error, isLoading};
    }

    export {useGetDonations};