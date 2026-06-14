import { useState } from "react";
import { donateToUser } from "../api/campaignApi";

const useDonationForm = (campaignId) => {
    
    const[donation, setDonation] = useState({
        amount: "",
        email: "",
        emailUpdate: false,
        purchaseCondition: false,
        donorName: ""
    })

    const [error, setError] = useState({});

    const handleInput = (e) => {
        const {name, value} = e.target;

        if(name === "amount" && value < 10)
        {
            setError(prev => ({...prev, amount: "Beloppet måste vara minst 10kr"}));
        }
        else{
            setError(prev => ({...prev, amount: ""}));
        }

        setDonation((prev) => {
            return{
                ...prev,
                [name]: value
            }
        })


    }

    const handleCheckBox = (e) => {
        const { name, checked } = e.target;
        setDonation(prev => ({
        ...prev,
        [name]: checked
        }));
    }

    async function handleSubmit(e){
        e.preventDefault()
        // console.log("amount:", donation.amount, Number(donation.amount))

        if(Number(donation.amount) < 10 || donation.amount === 0)
        {
            setError(prev => ({...prev, amount: "Beloppet måste vara minst 10kr"}))
            console.log(error)
            return;
        }

        console.log("handleSubmit is running", { campaignId, donation })
        const data = await donateToUser({campaignId, donation})
        window.location.href = data.url;
    }
    
    return{
        donation,
        handleInput,
        handleSubmit,
        handleCheckBox,
        error
    }
}
export default useDonationForm;