import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { createPost } from "../api/postApi";
import { Button } from "../../../shared/ui/button";
import { CheckBox } from "../../../shared/ui/checkbox";
import { FormField, TextArea } from "../../../shared/ui/input";
import { useFormState } from "../../../shared/lib/";
import { FileUploadButton } from "../../../shared/ui/file-upload";
import { getUploadSignature, uploadToCloudinary } from "../../../shared/api";
import { AddImageIcon } from "../../../shared/assets";

export default function CreatePostForm({ onPostCreated }) {
  const { t } = useTranslation();
  const {
    values: formData,
    setValues: setFormData,
    handleChange,
    reset,
  } = useFormState({
    title: "",
    content: "",
    media: [],
    acceptedTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);
  const [mediaError, setMediaError] = useState("");

  const handleMediaChange = async (event) => {
    const files = Array.from(event.target.files ?? []);

    if (files.length === 0) return;

    setMediaError("");
    setIsUploadingMedia(true);

    try {
      const uploadedMedia = [];

      for (const file of files) {
        const signature = await getUploadSignature(file, "post-media");
        const uploaded = await uploadToCloudinary(file, signature);

        uploadedMedia.push({
          url: uploaded.secure_url,
          cloudinaryPublicId: uploaded.public_id,
          resourceType: uploaded.resource_type,
        });
      }

      setFormData((prev) => ({
        ...prev,
        media: [...prev.media, ...uploadedMedia],
      }));
    } catch (error) {
      setMediaError(error.message || t("Uppladdningen misslyckades"));
    } finally {
      setIsUploadingMedia(false);
      event.target.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createPost(formData);
      reset();

      setMessage({ text: t("Post created successfully!"), type: "success" });

      if (onPostCreated) onPostCreated(); // Refresh the feed
    } catch (err) {
      setMessage({ text: err.message, type: "error" });
      console.error("Error creating post:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="w-full pb-[4rem]">

      <form onSubmit={handleSubmit} className=" w-full flex flex-col items-center gap-15">
        <h1 className="text-[3rem] font-bold text-primary p-[2rem]">{t("Skapa ett nytt inlägg")}</h1>

          {/* IMAGE UPLOAD */}
          <section className="border-3 border-dashed border-gray-400 w-[50%] h-[30rem] flex flex-col items-center justify-center">
              {/* File uploading "form" */}
              <FileUploadButton
                accept="image/jpeg,image/png,image/webp,video/mp4,video/webm,video/quicktime"
                multiple
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
              
              {formData.media.length > 0 && (
                <p className="text-sm text-gray-500">
                  {t("{{count}} media uppladdade", { count: formData.media.length })}
                </p>
              )}
          </section>



        {/* INPUTS */}
        <section className="border border-gray-400 rounded-[0.5rem] w-[60%] p-[2rem]">

            <FormField
              label={t("Rubrik")}
              type="text"
              name="title"
              placeholder={t("T.ex. Jag vann tävlingen!")}
              value={formData.title}
              onChange={handleChange}
              required
            />

            <section className="pt-[1rem]">
                <p>{t("Beskrivning")}</p>
                <TextArea className="w-full"
                  label={t("Beskrivning")}
                  name="content"
                  placeholder={t("Berätta om din nya framgång, motgång eller dela med dig om hur det gick på en träning! ")}
                  required
                  value={formData.content}
                  onChange={handleChange}
                />
            </section>

            <section className="flex flex-row justify-between pt-[2rem]">

              <div className="flex flex-row justify-center items-center gap-2">
                  <CheckBox 
                    checked = {formData.acceptedTerms}
                    onChange={(e) =>
                      setFormData(prev => ({
                        ...prev,
                        acceptedTerms: e.target.checked
                      }))
                    }
                    required />
                  <p>{t("Jag godkänner Atheltiqas")} <Link to="/anvandarvillkor" className="underline">{t("användarvillkor")}</Link></p>
              </div>


              <Button className="w-[15rem]" type="submit" disabled={loading}>
                {loading ? t("Publicerar...") : t("Publicera inlägg")}
              </Button>
            </section>


          {message.text && (
            <div className={`message ${message.type}`}>{message.text}</div>
          )}
        </section>


        
      </form>
    </article>
  );
}