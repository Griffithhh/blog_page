"use client";

import { Button } from "@heroui/react";
import { useRouter, usePathname } from "next/navigation";

import { createClient } from "../../../utils/supabase/client";

export default function MainButtons() {
  const supabase = createClient();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    console.log("session finished");
  };

  const switchLocale = (locale: "en" | "de") => {
    const segments = pathname.split("/").filter(Boolean);

    segments[0] = locale;
    router.push("/" + segments.join("/"));
  };

  return (
    <div className="flex gap-3 items-center">
      <Button
        className="bg-gray-800 text-white px-6 py-2 rounded-lg"
        onPress={() => router.push("/blog")}
      >
        Blog
      </Button>
      <Button
        className="bg-gray-800 text-white px-6 py-2 rounded-lg"
        onPress={() => router.push("/")}
      >
        Main
      </Button>
      <Button
        className="bg-black text-white px-6 py-2 rounded-lg"
        onPress={() => router.push("/api/debug")}
      >
        Check Session
      </Button>
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
      <Button
        className="bg-black text-white px-6 py-2 rounded-lg"
        onPress={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
}
