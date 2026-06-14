import { useState, useEffect } from "react";
import { getDonation } from "../../../shared/api/base/endpoints";

export function useDonation() {
    const [donation, setDonation] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadDonation() {
            try {
                const data = await getDonation();
                setDonation(data);
            } catch (error) {
                console.error(error);
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }
        loadDonation();
    }, []);

    return { donation, isLoading };
}