import { FormField, TextArea } from "../../../shared/ui/input";
import { RadioGroup } from "../../../shared/ui/radio-group";
import { Button } from "../../../shared/ui/button";
import { FormActions } from "../../../shared/ui/form-actions";
import { Chip } from "../../../shared/ui/chip";
import { DeleteAccountSection } from "../ui";
import { CameraIcon } from "../../../shared/assets";
import { useProfileSettings } from "../model";
import { checkRole } from "../../../shared/lib";
import { Form } from "react-router-dom";
import { FileUploadButton } from "../../../shared/ui/file-upload";
import { useTranslation } from "react-i18next";

// Profile tab on the settings page.
// Holds all the form fields (name, bio, gender, email, sports) in one state object
// so we can send the whole thing as one payload on save.
export default function ProfileSettingsForm() {
  const { role, loading } = checkRole();
  const { t } = useTranslation();

  const {
    profile,
    allSports,
    showSportPicker,
    setShowSportPicker,
    sportError,
    isDirty,
    handleChange,
    handleCancel,
    toggleSport,
    handleSubmit,
    avatarError,
    isUploadingAvatar,
    handleAvatarChange,
  } = useProfileSettings();

  if (loading) {
    return <p>{t("Laddar...")}</p>;
  }

  //-----------ATHLETE USER------------
  if (role === "Athlete") {
    return (
      <>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Heading */}
          <h1 className="hidden lg:block text-2xl font-bold text-primary">
            {t("Profilinställningar")}
          </h1>

          {/* Avatar change link */}
          <div className="flex flex-col gap-2">
            <FileUploadButton
              accept="image/jpeg,image/png,image/webp"
              disabled={isUploadingAvatar}
              onChange={handleAvatarChange}
            >
              <CameraIcon className="w-5 h-5 text-primary" />
              {isUploadingAvatar ? t("Laddar upp...") : t("Ändra profilbild")}
            </FileUploadButton>

            {avatarError && (
              <p className="text-sm font-bold text-error">{avatarError}</p>
            )}

            {profile.photoUrl && (
              <img
                  src={profile.photoUrl}
                  alt={t("Profilbild")}
                  className="w-24 h-24 rounded-full object-cover border border-gray-300"
                />
            )}
          </div>

          {/* First + last name, side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label={t("Förnamn")}
              name="firstName"
              value={profile.firstName}
              onChange={handleChange}
            />

            <FormField
              label={t("Efternamn")}
              name="lastName"
              value={profile.lastName}
              onChange={handleChange}
            />
          </div>

          {/* Bio (multiline) */}
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-gray-700">{t("Biografi")}</span>
            <TextArea name="bio" value={profile.bio} onChange={handleChange} />
          </label>

          {/* Gender radios. All three share the same name so only one can be picked. */}
          <RadioGroup
            name="gender"
            value={profile.gender}
            onChange={handleChange}
            options={[
              { value: "Male", label: "Man" },
              { value: "Female", label: "Kvinna" },
              { value: "Other", label: "Annat" },
            ]}
          />

          {/* Email */}
          <FormField
            label={t("E-postadress")}
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
          />

          {/* Sports picker, top row is the currently selected, grid below are the clicks to toggle. */}
          <div className="flex flex-col gap-3">
            <span className="text-sm text-gray-700">{t("Mina sporter")}</span>

            {/* Selected sports + add button */}
            <div className="flex flex-wrap items-center gap-2">
              {profile.sports.map((sport) => (
                <Chip key={sport}>{sport}</Chip>
              ))}
                <Button
                variant="outline"
                onClick={() => setShowSportPicker((prev) => !prev)}
                className="flex items-center gap-1"
              >
                {t("Lägg till")} <span aria-hidden="true">+</span>
              </Button>
            </div>

            {sportError && (
                <p className="text-sm font-bold text-error">
                {t("Du får välja max 5 sporter")}
              </p>
            )}

            {showSportPicker && (
              <>
                <hr className="border-gray-200" />

                {/* Full sport grid. Clicking a button toggles it in/out of profile.sports */}
                <div className="flex flex-wrap gap-2">
                  {allSports.map((sport) => {
                    const isSelected = profile.sports.includes(sport.name);
                    return (
                      <Button
                        key={sport.id}
                        variant={isSelected ? "accent" : "outline"}
                        onClick={() => toggleSport(sport.name)}
                      >
                        {sport.name}
                      </Button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Save + cancel buttons */}
          <FormActions show={isDirty} onCancel={handleCancel} />
        </form>

        <div className="mt-10">
          <DeleteAccountSection />
        </div>
      </>
    );
  }

  //-----------SPONSOR USER------------
  if (role === "SponsorUser") {
    return (
      <>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Heading */}
          <h1 className="hidden lg:block text-2xl font-bold text-primary">
            {t("Profilinställningar")}
          </h1>

          {/* Avatar change link */}
          <div className="flex flex-col gap-2">
            <FileUploadButton
              accept="image/jpeg,image/png,image/webp"
              disabled={isUploadingAvatar}
              onChange={handleAvatarChange}
            >
              <CameraIcon className="w-5 h-5 text-primary" />
              {isUploadingAvatar ? t("Laddar upp...") : t("Ändra profilbild")}
            </FileUploadButton>

            {avatarError && (
              <p className="text-sm font-bold text-error">{avatarError}</p>
            )}

            {profile.photoUrl && (
              <img
                src={profile.photoUrl}
                alt={t("Profilbild")}
                className="w-24 h-24 rounded-full object-cover border border-gray-300"
              />
            )}
          </div>

          {/* First + last name, side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label={t("Förnamn")}
              name="firstName"
              value={profile.firstName}
              onChange={handleChange}
            />

            <FormField
              label={t("Efternamn")}
              name="lastName"
              value={profile.lastName}
              onChange={handleChange}
            />
          </div>

          {/* Description (multiline) */}
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-gray-700">{t("Beskrivning")}</span>
            <TextArea
              name="description"
              value={profile.description}
              onChange={handleChange}
            />
          </label>

          {/* Gender radios. All three share the same name so only one can be picked. */}
          {/* <RadioGroup
            name="gender"
            value={profile.gender}
            onChange={handleChange}
            options={[
              { value: "Male", label: "Man" },
              { value: "Female", label: "Kvinna" },
              { value: "Other", label: "Annat" },
            ]}
          /> */}

          {/* Email */}
          <FormField
            label={t("E-postadress")}
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
          />

          {/* Save + cancel buttons */}
          <FormActions show={isDirty} onCancel={handleCancel} />
        </form>

        <div className="mt-10">
          <DeleteAccountSection />
        </div>
      </>
    );
  }

  if (role === "SponsorCompanyUser") {
    return (
      <>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Heading */}
          <h1 className="hidden lg:block text-2xl font-bold text-primary">
            Profilinställningar
          </h1>

          {/* Avatar change link */}
          <div className="flex flex-col gap-2">
            <FileUploadButton
              accept="image/jpeg,image/png,image/webp"
              disabled={isUploadingAvatar}
              onChange={handleAvatarChange}
            >
              <CameraIcon className="w-5 h-5 text-primary" />
              {isUploadingAvatar ? "Laddar upp..." : "Ändra profilbild"}
            </FileUploadButton>

            {avatarError && (
              <p className="text-sm font-bold text-error">{avatarError}</p>
            )}

            {profile.photoUrl && (
              <img
                src={profile.photoUrl}
                alt="Profilbild"
                className="w-24 h-24 rounded-full object-cover border border-gray-300"
              />
            )}
          </div>

          {/* First + last name, side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Förnamn"
              name="firstName"
              value={profile.firstName}
              onChange={handleChange}
            />

            <FormField
              label="Efternamn"
              name="lastName"
              value={profile.lastName}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Organisationsnamn"
              name="companyName"
              value={profile.companyName}
              onChange={handleChange}
            />

            <FormField
              label="Organisationsnummer"
              name="orgNumber"
              value={profile.orgNumber}
              onChange={handleChange}
            />
          </div>

          {/* Description (multiline) */}
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-gray-700">Beskrivning</span>
            <TextArea
              name="description"
              value={profile.description}
              onChange={handleChange}
            />
          </label>

          {/* Gender radios. All three share the same name so only one can be picked. */}
          {/* <RadioGroup
            name="gender"
            value={profile.gender}
            onChange={handleChange}
            options={[
              { value: "Male", label: "Man" },
              { value: "Female", label: "Kvinna" },
              { value: "Other", label: "Annat" },
            ]}
          /> */}

          {/* Email */}
          <FormField
            label="E-postadress"
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
          />

          {/* Save + cancel buttons */}
          <FormActions show={isDirty} onCancel={handleCancel} />
        </form>

        <div className="mt-10">
          <DeleteAccountSection />
        </div>
      </>
    );
  }
}
