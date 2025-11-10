import { ReactNode } from "react";

import LocaleProvider from "@/components/WrapperProvider/WrapperProvider";
import {
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  Locale,
  TIMEZONE,
} from "@/i18n-config";

interface Props {
  children: ReactNode;
  params: { locale: string };
}

export default function LocaleLayout({ children, params }: Props) {
  const locale: Locale = SUPPORTED_LOCALES.includes(params.locale as Locale)
    ? (params.locale as Locale)
    : DEFAULT_LOCALE;

  const MessagesProvider = async () => {
    const messages = (await import(`../../messages/${locale}.json`)).default;

    return (
      <LocaleProvider locale={locale} messages={messages} timeZone={TIMEZONE}>
        {children}
      </LocaleProvider>
    );
  };

  return <MessagesProvider />;
}
