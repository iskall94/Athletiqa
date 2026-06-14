import { useFormState } from "../../../shared/lib/";
import {useState, useEffect, useRef } from "react";
import { getGuardianData, updateGuardian } from "../api/settingsApi";

// Mock starting state. Swap with backend values when ready.
const initialGuardian = {
  firstName: "",
  lastName: "",
  relationship: "", // "Parent" | "LegalGuardian" | "Sibling" | "Other"
  email: "",
  phonenumber: "",
};



export default function useGuardianSettings() {
  const {
    values: guardian,
    setValues: setGuardian,
    handleChange,
    isDirty,
  } = useFormState(initialGuardian);

  const savedGuardian = useRef(initialGuardian); // Ref to store the originally loaded guardian for dirty checking
  const handleCancel = () => setGuardian(savedGuardian.current);

  useEffect(() => {
      async function loadGuardian() {
  
        try{
          const data = await getGuardianData();
          
          const loaded = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phonenumber: data.phonenumber,
            relationship: data.relationship,
          }
  
          savedGuardian.current = loaded; // Store the loaded guardian in a ref for later comparison
          setGuardian(loaded); // Update the form state with the loaded guardian
          
        }
        catch(error){
          console.error("Failed to load guardian data: ", error);
        }
      }
      loadGuardian();
    }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Saving guardian:", guardian);
    await updateGuardian(guardian);
    savedGuardian.current = guardian;
  };

    return {
        guardian,
        handleChange,
        isDirty,
        handleCancel,
        handleSubmit,
        
    }
}