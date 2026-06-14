import { useEffect, useState } from "react";
import { getMyCampaigns } from "../api/base/endpoints";

export function useMyCampaigns() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);

                const result = await getMyCampaigns();

                setData(result);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return { data, loading, error };
}