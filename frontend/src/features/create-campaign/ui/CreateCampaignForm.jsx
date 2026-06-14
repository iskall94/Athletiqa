import { useState } from "react";
import { Link } from "react-router-dom";
import { createCampaign } from "../api/campaignApi";
import { Button } from "../../../shared/ui/button";
import { CheckBox } from "../../../shared/ui/checkbox";
import { FormField, TextArea } from "../../../shared/ui/input";
import { useFormState } from "../../../shared/lib";
import { FileUploadButton } from "../../../shared/ui/file-upload";
import { getUploadSignature, uploadToCloudinary } from "../../../shared/api";
import { useTranslation } from "react-i18next";
import { AddImageIcon } from "../../../shared/assets";

export default function CreateCampaignForm({ onCampaignCreated }) {
  const { t } = useTranslation();
  const {
    values: formData,
    handleChange,
    setField,
    reset,
  } = useFormState({
    title: "",
    content: "",
    goalAmount: 0,
    media: null,
    acceptedTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);
  const [mediaError, setMediaError] = useState("");

  const handleMediaChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setMediaError("");
    setIsUploadingMedia(true);

    try {
      const signature = await getUploadSignature(file, "campaign-media");
      const uploaded = await uploadToCloudinary(file, signature);

      setField("media", {
        url: uploaded.secure_url,
        cloudinaryPublicId: uploaded.public_id,
        resourceType: uploaded.resource_type,
      });
    } catch (error) {
      setMediaError(error.message || t("Uppladdningen misslyckades"));
    } finally {
      setIsUploadingMedia(false);
      event.target.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setLoading(true); // Set loading state to true to disable the button and show feedback

    try {
      await createCampaign(formData);

      alert(t("Campaign launched!"));

      // Reset form
      reset();

      // Notify parent to refresh list or close modal
      if (onCampaignCreated) {
        onCampaignCreated();
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="w-full pb-[4rem]">

      <form onSubmit={handleSubmit} className=" w-full flex flex-col items-center gap-15">
        <h1 className="text-[3rem] font-bold text-primary p-[2rem]">Skapa en ny insamling</h1>

        {/* IMAGE UPLOAD */}
            <section className="border-3 border-dashed border-gray-400 w-[50%] h-[30rem] flex flex-col items-center justify-center">
                {/* File uploading "form" */}
                <FileUploadButton
                  accept="image/jpeg,image/png,image/webp,video/mp4,video/webm,video/quicktime"
                  disabled={isUploadingMedia}
                  onChange={handleMediaChange}
                >
                  {isUploadingMedia ? t("Laddar upp...") 
                  : 
                  <section className="text-black flex flex-col items-center p-[5rem]">
                    <AddImageIcon />
                    <h2 className="text-xl font-bold">{t("Ladda upp media")}</h2>
                    <p className="text-gray-600">{t("(JPG, PNG eller MP4)")}</p>
                  </section>}
                </FileUploadButton>
                
                {mediaError && (
                  <p className="text-sm font-bold text-error">{mediaError}</p>
                )}
                
                {formData.media && (
                  <p className="text-sm text-gray-500">
                    {t("Bild uppladdad")}
                  </p>
                )}
            </section>


        {/* INPUTS */}
        <section className="border border-gray-400 rounded-[0.5rem] w-[60%] p-[2rem]">
            <FormField
              label="Rubrik"
              type="text"
              name="title"
              placeholder="T.ex. Behöver ny hockeyklubba"
              value={formData.title}
              onChange={handleChange}
              required
            />


            <FormField
              label="Insamlingsmål"
              type="number"
              name="goalAmount"
              min="1"
              step="1"
              value={formData.goalAmount}
              onChange={(e) =>
                setField("goalAmount", Number.parseInt(e.target.value, 10) || 0)
              }
              required
            />

            <section className="pt-[1rem]">
                  <p>{t("Beskrivning")}</p>
                  <TextArea className="w-full"
                    name="content"
                    placeholder={t("Berätta om vad pengarna ska gå till")}
                    required
                    value={formData.content}
                    onChange={handleChange}
                  />
            </section>

            <section className="flex flex-row justify-between pt-[2rem]">

              <div className="flex flex-row justify-center items-center gap-2">
                  <CheckBox 
                    checked = {formData.acceptedTerms}
                    onChange={(e) => setField("acceptedTerms", e.target.checked)}
                    required />
                  <p>{t("Jag godkänner Athletiqas")} <Link to="/anvandarvillkor" className="underline">användarvillkor</Link></p>
              </div>


              <Button className="w-[15rem]" type="submit" disabled={loading}>
                {loading ? t("Skapar...") : t("Skapa insamling")}
              </Button>
            </section>

        </section>

      </form>
    </article>
  );
}