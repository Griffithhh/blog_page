"use server";

const messages = {
  required: "Email, пароль и имя обязательны",
  exists: "Пользователь с такой почтой уже существует",
  signupSuccess: "Аккаунт создан успешно",
  loginSuccess: "Вы успешно вошли в систему",
};

// ====================== LOGIN ======================
export async function login(formData: FormData) {
  const supabase = await import("../../../../utils/supabase/server").then((m) =>
    m.createClient(),
  );

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!email || !password)
    return { success: false, message: "Email и пароль обязательны" };

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  const user = data?.user;

  if (error || !user)
    return { success: false, message: error?.message ?? "Ошибка авторизации" };

  return { success: true, message: messages.loginSuccess };
}
