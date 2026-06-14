import { useState } from "react";
import { registerUser } from "../api/authApi";
import { validateEmail } from "../../../shared/lib/validateEmail";

const useRegisterForm = () => {
  // This is the useRegisterForm hook that manages the state of the registration form.
  // It initializes the user state with default values for name, lastname, email, password, confirmPassword, organization, userAgreement, and role.
  // The hook also defines functions to handle input changes, form submission, checkbox changes, and role changes.
  // These functions update the user state accordingly. The hook returns the user state and the handler functions for use in the RegisterForm component.
  const [user, setUser] = useState({
    name: "",
    lastName: "",
    password: "",
    personNumber: "",
    phoneNumber: "",
    email: "",
    guardianPersonNumber: "",
    guardianName: "",
    guardianLastname: "",
    guardianEmail: "",
    guardianPhoneNumber: "",
    guardianRelationship: "",
    orgName: "",
    orgNumber: "",
    confirmPassword: "",
    role: "athlete",
    organization: false,
    isMinor: false,
    isUnderThirteen: false,
    userAgreement: false,
    gender: "",
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  // This function handles checkbox changes for the organization and user agreement fields.
  // It takes the event as an argument, extracts the name and checked value from the target, and updates the user state accordingly.
  const handleCheckBox = (e) => {
    const { name, checked } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  function getAgeFromPersonnummer(personnumber) {
    let cleanValue = personnumber.replace(/[^0-9]/g, ""); // Remove non-numeric characters from personnumber input
    let age;
    if (cleanValue.length >= 12) {
      cleanValue = cleanValue.substring(2); // If the personnumber is 12 digits long, remove the first two digits (century) to get the 10-digit format
    }
    if (cleanValue.length !== 10) {
      return null; // If the cleaned personnumber is not 10 digits long, return null to indicate invalid personnumber input
    }

    const currentDay = new Date(); // Get current day
    const currentYearShort = currentDay.getFullYear() % 100; // Get last two digits of current year
    let fullBirthYear;
    // Check if the cleaned personnumber is either 10 or 12 digits long and contains only number

    const birthYear = parseInt(cleanValue.substring(0, 2)); // Get the first two digits of the personnumber as birth year
    const birthMonth = parseInt(cleanValue.substring(2, 4)); // Get the next two digits of the personnumber as birth month
    if (birthYear < 0 || birthYear > 99 || birthMonth < 1 || birthMonth > 12) {
      return null; // If the birth month is not between 1 and 12, return false to indicate invalid personnumber input
    }

    if (birthYear <= currentYearShort) {
      fullBirthYear = 2000 + birthYear; // Handle birth years in the 2000s
    } else {
      fullBirthYear = 1900 + birthYear; // Handle birth years in the 1900s
    }

    const birthDay = parseInt(cleanValue.substring(4, 6)); // Get the next two digits of the personnumber as birth day
    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // Array of days in each month
    if (
      (fullBirthYear % 4 === 0 && fullBirthYear % 100 !== 0) ||
      fullBirthYear % 400 === 0
    ) {
      daysInMonth[1] = 29; // If the birth year is a leap year, set February to have 29 days
    }

    if (birthDay < 1 || birthDay > daysInMonth[birthMonth - 1]) {
      return null; // If the birth day is not between 1 and the number of days in the birth month, return null to indicate invalid personnumber input
    }
    age = currentDay.getFullYear() - fullBirthYear; // Calculate age based on the current year and the full birth year

    let monthDiff = currentDay.getMonth() + 1 - birthMonth; // Get current month and calculate month difference
    let dayDiff = currentDay.getDate() - birthDay; // Get current day and calculate day difference

    // If the current mon   th and day are before the birth month and day, subtract one from age to account for not having reached the birthday yet in the current year
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--; // If the current month and day are before the birth month and day, subtract one from age
    }

    return age; // Return the calculated age based on the personnumber input
  }

  const validateField = (name, value, currentUser = user) => {
    if (!value) {
      return "Detta fält är obligatorisk";
    }

    if (name === "email") {
      return validateEmail(user.email);
    }

    if (name === "password" && value.length < 8) {
      return "Lösenordet måste innehålla minst 8 tecken.";
    }

    if (name === "confirmPassword" && value !== currentUser.password) {
      return "Lösenorden matchar inte.";
    }

    if (name === "personNumber") {
      const age = getAgeFromPersonnummer(value);

      if (age === null) {
        return "Ange ett giltigt personnummer.";
      }

      if (currentUser.role === "sponsor" && age < 18) {
        return "En sponsor måste vara över 18 år.";
      }
    }

    if (name === "guardianPhoneNumber" || name === "phoneNumber") {
      const cleanedNumber = value.replace(/[\s-]/g, "");

      const swedishPhoneRegex = /^(([+]46)|(0)|(0046))(\d{7,9})$/;

      if (!swedishPhoneRegex.test(cleanedNumber)) {
        return "Ange ett giltigt telefonnummer";
      }
    }

    return "";
  };

  // This function handles input changes for the form fields.
  // It takes the event as an argument, extracts the name and value from the target, and updates the user state accordingly.
  const handleInput = (e) => {
    const { name, value } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    setUser((prev) => {
      // If the input field is not the person number, simply update the corresponding field in the user state
      const nextUser = {
        ...prev,
        [name]: value,
      };
      if (name === "personNumber") {
        //Cal function to calculate age based on person number input and update the user state with the calculated age, isMinor, and isUnderThirteen values
        const age = getAgeFromPersonnummer(value);

        nextUser.isMinor = age === null ? null : age < 18;
        nextUser.isUnderThirteen = age === null ? null : age < 13;
      }

      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validateField(name, value, nextUser),
        ...(name === "password" && nextUser.confirmPassword
          ? {
              confirmPassword: validateField(
                "confirmPassword",
                nextUser.confirmPassword,
                nextUser,
              ),
            }
          : {}),
      }));

      // Update the user state with the new person number value, calculated age, and flags for minor and under thirteen based on the calculated age
      return nextUser;
    });
  };
  // This function handles form submission.
  // It prevents the default form submission behavior and can be extended to include form validation and API calls for user registration.
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with user data: ", user);

    if (user.role === "sponsor" && user.isMinor) {
      console.error("En sponsor måste vara över 18 år");
      return;
    }

    registerUser(user)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // This function handles role changes when the user clicks on the role switcher buttons.
  // It takes the new role as an argument and updates the user state with the selected role.
  const handleRoleChange = (role) => {
    setTouched({});
    setErrors({});

    setUser((prev) => ({
      ...prev,
      role: role,
      organization: false, // Reset organization checkbox when role changes
      orgName: "", // Reset organization name when role changes
      orgNumber: "", // Reset organization number when role changes
      guardianEmail: "", // Reset guardian email when role changes
      guardianName: "", // Reset guardian name when role changes
      guardianLastname: "", // Reset guardian lastname when role changes
      guardianPersonNumber: "", // Reset guardian person number when role changes
      guardianPhoneNumber: "",
      guardianRelationship: "parent",
      personNumber: "", // Reset person number when role changes
      isMinor: false, // Reset minor status when role changes
      isUnderThirteen: false, // Reset under thirteen status when role changes
      gender: "",
      phoneNumber: "",
      sponsorType: "individual",
    }));
  };

  return {
    user,
    touched,
    errors,
    handleInput,
    handleSubmit,
    handleCheckBox,
    handleRoleChange,
  };
};

export default useRegisterForm;
