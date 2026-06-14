import { useState, useEffect, useRef } from "react";
import { useFormState, checkRole } from "../../../shared/lib";
import {
  getAthleteProfile,
  updateAthlete,
  getAthleteSports,
  updateAthleteSports,
  getSponsorProfile,
  updateSponsor,
} from "../api/settingsApi";
import {
  getAllSports,
  getUploadSignature,
  uploadToCloudinary,
} from "../../../shared/api";

// Fake user for now, swap out when the backend is hooked up.
// Keys here have to match the `name` props on the inputs below,
// otherwise handleChange won't know what to update.
const initialProfile = {
  firstName: "",
  lastName: "",
  bio: "",
  gender: "", // "man" | "kvinna" | "annat"
  email: "",
  sports: [],
  photoUrl: "",
  photoPublicId: "",
  companyName: "",
  orgNumber: "",
  description: "",
};

// Profile tab on the settings page.
// Holds all the form fields (name, bio, gender, email, sports) in one state object
// so we can send the whole thing as one payload on save.
export default function useProfileSettings() {
  const {
    values: profile,
    setValues: setProfile,
    handleChange,
    isDirty,
  } = useFormState(initialProfile);

  const savedProfile = useRef(initialProfile); // Ref to store the originally loaded profile for dirty checking
  const handleCancel = () => {
    setProfile(savedProfile.current);
  }; // Reset to the originally loaded profile
  const { role, loading } = checkRole();

  const [allSports, setAllSports] = useState([]);
  const [showSportPicker, setShowSportPicker] = useState(false);
  const [sportError, setSportError] = useState(false);
  const [avatarError, setAvatarError] = useState("");
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (role !== "Athlete") return;

    async function loadSports() {
      try {
        const data = await getAllSports();
        setAllSports(data);
      } catch (error) {
        console.error("Failed to load sports: ", error);
      }
    }
    loadSports();
  }, [role, loading]);

  useEffect(() => {
    async function loadProfile() {
      try {
        if (loading) return;
        if (role === "Athlete") {
          const data = await getAthleteProfile();
          const sportsData = await getAthleteSports();

          const loaded = {
            firstName: data.firstName,
            lastName: data.lastName,
            bio: data.bio,
            gender: data.gender,
            email: data.email,
            sports: sportsData.sports || [],
            photoUrl: data.photoUrl,
            photoPublicId: data.photoPublicId,
          };

          savedProfile.current = loaded; // Store the loaded profile in a ref for later comparison
          setProfile(loaded); // Update the form state with the loaded profile
        }

        if (role === "SponsorUser") {
          const data = await getSponsorProfile();

          const loaded = {
            firstName: data.firstName,
            lastName: data.lastName,
            description: data.description,
            email: data.email,
            photoUrl: data.photoUrl,
            photoPublicId: data.photoPublicId,
          };

          savedProfile.current = loaded; // Store the loaded profile in a ref for later comparison
          setProfile(loaded); // Update the form state with the loaded profile
        }

        if (role === "SponsorCompanyUser") {
          const data = await getSponsorProfile();

          const loaded = {
            firstName: data.firstName,
            lastName: data.lastName,
            description: data.description,
            email: data.email,
            companyName: data.companyName,
            orgNumber: data.orgNumber,
            photoUrl: data.photoUrl,
            photoPublicId: data.photoPublicId,
          };

          savedProfile.current = loaded; // Store the loaded profile in a ref for later comparison
          setProfile(loaded); // Update the form state with the loaded profile
        }
      } catch (error) {
        console.error("Failed to load profile data: ", error);
      }
    }
    loadProfile();
  }, [role, loading]);

  // Add the sport if it's not in the list, remove it if it already is.
  // Used by the sport buttons in the picker grid.
  const toggleSport = (sport) => {
    if (role !== "Athlete") return;

    setProfile((prev) => {
      const alreadyPicked = prev.sports.includes(sport);

      // Trying to add a 6th sport, block it and turn the error on.
      if (!alreadyPicked && prev.sports.length >= 5) {
        setSportError(true);
        return prev;
      }

      setSportError(false);
      return {
        ...prev,
        sports: alreadyPicked
          ? prev.sports.filter((s) => s !== sport)
          : [...prev.sports, sport],
      };
    });
  };

  // Attempts to upload the file to Cloudinary, and then updates the profile with said file
  const handleAvatarChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setAvatarError("");
    setIsUploadingAvatar(true);

    try {
      const signature = await getUploadSignature(file, "avatar");
      const uploaded = await uploadToCloudinary(file, signature);

      setProfile((prev) => ({
        ...prev,
        photoUrl: uploaded.secure_url,
        photoPublicId: uploaded.public_id,
      }));
    } catch (error) {
      setAvatarError(error.message || "Uppladdningen misslyckades");
    } finally {
      setIsUploadingAvatar(false);
      event.target.value = "";
    }
  };

  // Save button. Just logs for now, API call goes here later.
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Saving profile: ", profile);

    if (role === "Athlete") {
      await updateAthlete(profile);
      await updateAthleteSports(profile.sports);
    }

    //Both SponsorUser and SponsorCompanyUser uses updateSponsor
    else if (role === "SponsorUser" || role === "SponsorCompanyUser") {
      await updateSponsor(profile);
    }

    savedProfile.current = profile; // Update the saved profile ref to the newly saved profile
  };

  return {
    profile,
    allSports,
    showSportPicker,
    setShowSportPicker,
    sportError,
    isDirty,
    handleChange,
    toggleSport,
    handleSubmit,
    handleCancel,
    loading,
    avatarError,
    isUploadingAvatar,
    handleAvatarChange,
  };
}
