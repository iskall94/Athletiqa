import { requestPasswordReset, resetPassword } from "../../../features/auth-by-email";

export async function forgotPasswordAction({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");

  try {
    await requestPasswordReset(email);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function resetPasswordAction({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const token = formData.get("token");
  const password = formData.get("password");

  try {
    await resetPassword({
      email,
      resetCode: token,
      newPassword: password
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}