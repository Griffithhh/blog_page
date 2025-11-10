"use client";

import { usePathname, useRouter } from "next/navigation";
import { Card, CardHeader, CardBody, Input, Button } from "@heroui/react";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

import { signup } from "./actions";

export default function SignupPage() {
  const router = useRouter();
  const t = useTranslations();
  const pathname = usePathname();
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const res = await signup(formData);

    if (!res) return;

    if (res.success) {
      toast.success(res.message);
      router.push("/login");
    } else {
      toast.error(res.message);
    }
  };

  const switchLocale = (locale: "en" | "de") => {
    const segments = pathname.split("/").filter(Boolean);

    segments[0] = locale;
    router.push("/" + segments.join("/"));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="absolute top-4 right-4 flex gap-3">
        <Button
          className="bg-black text-white px-4 py-2 rounded-lg"
          onPress={() => switchLocale("en")}
        >
          EN
        </Button>

        <Button
          className="bg-black text-white px-4 py-2 rounded-lg"
          onPress={() => switchLocale("de")}
        >
          DE
        </Button>
      </div>
      <Card className="w-full max-w-md shadow-xl border border-gray-200">
        <CardHeader className="flex flex-col gap-1 pb-0">
          <h1 className="text-2xl font-semibold text-black">
            {t("signup_title")}
          </h1>
          <p className="text-gray-500">{t("signup_subtitle")}</p>
        </CardHeader>

        <CardBody className="pt-4 flex flex-col gap-6">
          <form className="flex flex-col gap-6" onSubmit={handleSignup}>
            <Input
              required
              label={t("signup_full_name")}
              name="full_name"
              type="text"
            />

            <Input
              required
              label={t("signup_email")}
              name="email"
              type="email"
            />

            <Input
              required
              label={t("signup_password")}
              name="password"
              type="password"
            />

            <button
              className="cursor-pointer border border-gray-300 text-black hover:bg-gray-100 py-3 rounded-lg"
              type="submit"
            >
              {t("signup_button")}
            </button>
            <button
              className="cursor-pointer text-black underline hover:text-gray-700 text-sm mt-2"
              type="button"
              onClick={() => router.push("/login")}
            >
              {t("signup_no_account")}
            </button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
