import { ReactNode } from "react";
import { HeroUIProvider } from "@heroui/react";
import { ToastContainer } from "react-toastify";

import WrapperProvider from "@/components/WrapperProvider/WrapperProvider";
import {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  TIMEZONE,
  Locale,
} from "@/i18n-config";
import "react-toastify/dist/ReactToastify.css";

export default function LocaleLayout(props: any) {
  const { children, params } = props as {
    children: ReactNode;
    params: { locale: string };
  };

  const locale: Locale = SUPPORTED_LOCALES.includes(params.locale as Locale)
    ? (params.locale as Locale)
    : DEFAULT_LOCALE;

  const messages: Record<string, string> = require(
    `../../messages/${locale}.json`,
  );

  return (
    <WrapperProvider locale={locale} messages={messages} timeZone={TIMEZONE}>
      <HeroUIProvider>
        {children}
        <ToastContainer autoClose={3000} position="top-right" />
      </HeroUIProvider>
    </WrapperProvider>
  );
}
