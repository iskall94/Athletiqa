// Authentication API service!
const API_BASE = import.meta.env.VITE_API_URL || '';
// login function POST request

export async function loginUser(email, password) {
  const response = await fetch(`${API_BASE}/api/login?useCookies=true`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }), //wrap email and password in an object and convert to JSON string
  });

  //error handling with messages
  if (!response.ok) {
    // Sends specific error data rather than sending a generic message
    const errorData = await response.json().catch(() => null);
    console.error("Register error response: ", errorData);
    throw new Error("Inloggningen misslyckades, försök igen senare");
  }

  //return the response to the caller, which will handle it in the action function of the LoginPage (OBSOLETE)
  // const responseData = await response.json(); //only save json

  return true;
}

export async function registerUser(userData) {
  const roleId =
    userData.role === "athlete"
      ? 2
      : userData.role === "sponsor"
        ? userData.organization
          ? 4
          : 3
        : null;
  const genderMap = { man: 1, kvinna: 2, other: 3 };
  const genderId =
    userData.role === "athlete" ? (genderMap[userData.gender] ?? null) : null;

  const guardianRelationshipMap = {
    parent: 1,
    legalGuardian: 2,
    sibling: 3,
    other: 4,
  };

  const response = await fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: userData.email,
      password: userData.password,
      firstName: userData.name,
      lastName: userData.lastName,
      personalIdNumber: userData.personNumber,
      phoneNumber: userData.phoneNumber,
      userType: roleId,

      //Using spread operator to conditionally include properties in the request body based on the user's role and other attributes.
      // This way, we only send relevant data to the backend for each user type.

      ...(userData.role === "athlete" && { gender: genderId }),

      ...(userData.role === "sponsor" &&
        userData.organization === true && {
          name: userData.orgName,
          organisationNumber: userData.orgNumber,
        }),

      ...(userData.role === "athlete" &&
        userData.isMinor && {
          guardian: {
            firstName: userData.guardianName,
            lastName: userData.guardianLastname,
            email: userData.guardianEmail,
            phoneNumber: userData.guardianPhoneNumber,
            personalIdNumber: userData.guardianPersonNumber,
            relationship:
              guardianRelationshipMap[userData.guardianRelationship] ?? null,
          },
        }),
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error("Register error response: ", errorData);

    // Extract messages from either FluentValidation array or identity list
    let msg = "Registreringen misslyckades, försök igen senare";
    
    if (errorData?.errors) {
      msg = Object.values(errorData.errors).flat().join(", ");
    } else if (errorData?.Errors) {
      msg = errorData.Errors.join(", ");
    }

    throw new Error(msg);
  }
}

export async function requestPasswordReset(email) {
  // Uses standard ASP.NET Core Identity /forgotPassword mapping
  const response = await fetch(`${API_BASE}/api/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const errorData = await response.json().catch(() => null);
  
  if (!response.ok) {
    console.error("Forgot password error response: ", errorData);
    throw new Error(errorData?.message ?? "Kunde inte skicka återställningslänk. Kontrollera adressen.");
  }

  return true;
}

export async function resetPassword({ email, resetCode, newPassword }) {
  const response = await fetch(`${API_BASE}/api/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      resetCode, 
      newPassword,
    }),
  });

  const errorData = await response.json().catch(() => null);

  if (!response.ok) {
    console.error("Reset password error response: ", errorData);
    throw new Error(errorData?.message ?? "Lösenordsåterställningen misslyckades. Länken kan ha löpt ut.");
  }

  return true;
}

export async function confirmEmailVerification(userId, token) {
  const response = await fetch(`${API_BASE}/api/auth/email/verification/confirm`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, token }),
  });

  const errorData = await response.json().catch(() => null);

  if (!response.ok) 
  {
    console.error("Email verification service error: ", errorData);

    const message = errorData?.errors?.[0] || errorData?.message || "Verifieringen misslyckades.";
    throw new Error(message);
  }

  return true;
}