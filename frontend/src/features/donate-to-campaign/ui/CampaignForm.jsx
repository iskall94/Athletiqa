import { FormField } from "../../../shared/ui/input";
import { Button } from "../../../shared/ui/button";
import { CheckBox } from "../../../shared/ui/checkbox";
import { Card } from "../../../shared/ui/card";
import useDonationForm from "../model/useCampaignForm";

export default function CampaignForm({campaignId})
{
    const {donation, handleInput, handleSubmit, handleCheckBox, error} = useDonationForm(campaignId);

  return (
    <>
      <Card
        shadow
        className="m-5 w-[36.75rem] px-7 py-9 inline-flex flex-col justify-start items-center"
      >
        <form onSubmit={(e) => handleSubmit(e)} className="w-full">
          <article className=" w-full flex flex-col items-center">
            <section className="flex flex-col items-center text-center">
              <h1 className="font-bold text-[2rem] text-gray-700">
                Nästan klart!
              </h1>
              <p>
                Fyll i din e-postadress och bekräfta summan för att slutföra
                betalningen.
              </p>
              <p>Vi skickar kvittot direkt till din mejl.</p>
            </section>

                    <section className="mt-10 w-full flex flex-col justify-center gap-3 rounded-xl">

                        <section className="w-full p-2">
                            <FormField 
                                className="w-full bg-bg rounded-xl p-2 border border-gray-300"
                                type="number"
                                label="Summa du vill donera"
                                labelClassName="text-lg"
                                name="amount"
                                placeholder="Ange belopp i SEK"
                                value={donation.amount}
                                onChange={handleInput}
                                required/>
                            {error.amount && <p className="text-error text-sm">{error.amount}</p>}
                        </section>
                        
                        

                        <section className="w-full p-2">
                            <FormField
                                className="w-full bg-bg rounded-xl p-2 border border-gray-300"
                                type="email"
                                label="E-postadress"
                                labelClassName="text-lg"
                                name="email"
                                placeholder="example@gmail.com"
                                value={donation.email}
                                onChange={handleInput}
                                required
                            />
                        </section>

                        <section className="w-full p-2">
                            <p>Visningsnamn</p>
                            <p className="text-xs">Detta namn kommer visa upp i donationslistan. Skippa denna om du vill förbli anonym.</p>
                            <FormField
                                className="w-full bg-bg rounded-xl p-2 border border-gray-300"
                                type="text"
                                name="donorName"
                                placeholder="John Doe"
                                value={donation.donorName}
                                onChange={handleInput}
                            />
                        </section>

                        <CheckBox
                            className="p-2"
                            name="emailUpdate"
                            id="email-update"
                            label="Jag vill få uppdateringar via e-post om atletens framgångar"
                            checked={donation.emailUpdate}
                            onChange={handleCheckBox}
                        />

                        <CheckBox
                            className="p-2" 
                            name="purchaseCondition"
                            id="purchase-condition"
                            label="Jag godkänner Athletiqas köpvillkor"
                            checked={donation.purchaseCondition}
                            onChange={handleCheckBox}
                            required
                        />
                        <div className="flex justify-center">
                            <Button type="submit" className="flex items-center justify-center bg-primary text-white text-[2rem] w-[90%] h-[3rem] rounded-2xl hover:bg-accent hover:text-primary cursor-pointer ">Donera</Button>
                        </div>
                    </section>
                </article>
            </form>
            </Card>
        </>
    )
}
