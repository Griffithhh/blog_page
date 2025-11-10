import { ReactNode } from "react";

import LocaleProvider from "@/components/WrapperProvider/WrapperProvider";
import {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  Locale,
  TIMEZONE,
} from "@/i18n-config";

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  return <AsyncLocaleLayout params={params}>{children}</AsyncLocaleLayout>;
}

async function AsyncLocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const locale: Locale = SUPPORTED_LOCALES.includes(params.locale as Locale)
    ? (params.locale as Locale)
    : DEFAULT_LOCALE;

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <LocaleProvider locale={locale} messages={messages} timeZone={TIMEZONE}>
      {children}
    </LocaleProvider>
  );
}
