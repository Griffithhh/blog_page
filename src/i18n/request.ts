import { getRequestConfig } from 'next-intl/server';
import type { Locale } from 'next-intl';

const supportedLocales: Locale[] = ['en', 'de'];

function isSupportedLocale(locale: unknown): locale is Locale {
  return typeof locale === 'string' && supportedLocales.includes(locale as Locale);
}

export default getRequestConfig(async ({ requestLocale }) => {
  const locale: Locale = isSupportedLocale(requestLocale) ? requestLocale : 'en';

  const messages = (await import(`../messages/${locale}.json`)).default;

  return {
    locale,
    messages,
    timeZone: 'Europe/Berlin',
  };
});
