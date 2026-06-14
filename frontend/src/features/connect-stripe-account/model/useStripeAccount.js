import { createOnboardLink } from "../api/createOnboardLink";
import {useState} from 'react'

export const useStripeAccount = () => {
    const [error, setError] = useState(null); //state to hold any error messages

    const connectStripeAccount = async () => {
        try {
            const data = await createOnboardLink(); //call the createOnboardLink function to get the onboarding link data
            if (data.url) {
                window.location.href = data.url; //send user to Stripe-onboarding page if data contains the url
            } 
            else {
                throw new Error("Kunde ej hämta Stripe-länk. Försök igen senare."); //throw an error if the data does not contain the url
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return { connectStripeAccount, error }; 
};