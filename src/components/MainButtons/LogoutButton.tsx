'use client';

import { Button } from "@heroui/react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "../../../utils/supabase/client";

export default function MainButtons() {
  const supabase = createClient();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    console.log("session finished");
  };

  const switchLocale = (locale: "en" | "de") => {

    const segments = pathname.split('/').filter(Boolean);
    segments[0] = locale;
    router.push('/' + segments.join('/'));
  };

  return (
    <div className="flex gap-3 items-center">
      <Button
        onPress={() => router.push('/blog')}
        className="bg-gray-800 text-white px-6 py-2 rounded-lg"
      >
        Blog
      </Button>
      <Button
        onPress={() => router.push('/')}
        className="bg-gray-800 text-white px-6 py-2 rounded-lg"
      >
        Main
      </Button>
      <Button
        onPress={() => router.push('/api/debug')}
        className="bg-black text-white px-6 py-2 rounded-lg"
      >
        Check Session
      </Button>
      <Button
        onPress={() => switchLocale('en')}
        className="bg-black text-white px-4 py-2 rounded-lg"
      >
        EN
      </Button>
      <Button
        onPress={() => switchLocale('de')}
        className="bg-black text-white px-4 py-2 rounded-lg"
      >
        DE
      </Button>
      <Button
        onPress={handleLogout}
        className="bg-black text-white px-6 py-2 rounded-lg"
      >
        Logout
      </Button>
    </div>
  );
}
