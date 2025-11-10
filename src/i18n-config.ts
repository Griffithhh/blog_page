export const i18n = {
  defaultLocale: "en",
  locales: ["en", "de", "cs"],
  timezone: "Europe/Berlin",
} as const;

export type Locale = (typeof i18n)["locales"][number];

export const DEFAULT_LOCALE = i18n.defaultLocale;
export const SUPPORTED_LOCALES = i18n.locales;
export const TIMEZONE = i18n.timezone;
