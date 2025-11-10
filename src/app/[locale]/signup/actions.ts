"use server";

import { createAdminClient } from "../../../../utils/supabase/admin";

const messages = {
  required: "Email, Fullname is required :)))",
  exists: "User Exists",
  signupSuccess: "Congratulation sign up",
  loginSuccess: "Congratulation log in",
};

export async function signup(formData: FormData) {
  const supabase = createAdminClient();

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const fullName = String(formData.get("full_name") ?? "");

  if (!email || !password || !fullName) {
    return { success: false, message: messages.required };
  }

  const { data: usersData, error: listError } =
    await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });

  if (listError) return { success: false, message: listError.message };

  const userExists = usersData?.users?.some(
    (u) => u.email?.toLowerCase() === email.toLowerCase(),
  );

  if (userExists) return { success: false, message: messages.exists };

  const { data: signUpData, error: signUpError } =
    await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: fullName },
    });

  if (signUpError) return { success: false, message: signUpError.message };

  return { success: true, message: messages.signupSuccess };
}
