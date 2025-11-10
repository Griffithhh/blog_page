import { ReactNode } from "react";

import LocaleProvider from "@/components/WrapperProvider/WrapperProvider";
import {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  Locale,
  TIMEZONE,
} from "@/i18n-config";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }> | { locale: string };
};

export default async function LocaleLayout({ children, params }: Props) {
  const resolvedParams = await Promise.resolve(params);
  const locale: Locale = SUPPORTED_LOCALES.includes(
    resolvedParams.locale as Locale,
  )
    ? (resolvedParams.locale as Locale)
    : DEFAULT_LOCALE;

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <LocaleProvider locale={locale} messages={messages} timeZone={TIMEZONE}>
      {children}
    </LocaleProvider>
  );
}
