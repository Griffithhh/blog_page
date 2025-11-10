// src/components/WrapperProvider/WrapperProvider.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
  locale: string;
  timeZone: string;
  messages: Record<string, string>;
};

export default function WrapperProvider({
  children,
  locale,
  messages,
  timeZone,
}: Props) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
        timeZone={timeZone}
      >
        {children}
      </NextIntlClientProvider>
    </QueryClientProvider>
  );
}
