export const locales = ["sk", "cz", "hu", "de", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "sk";

export const localeNames: Record<Locale, string> = {
  sk: "Slovenčina",
  cz: "Čeština",
  hu: "Magyar",
  de: "Deutsch",
  en: "English",
};

const dictionaries: Record<Locale, () => Promise<Record<string, string>>> = {
  sk: () => import("@/messages/sk.json").then((m) => m.default),
  cz: () => import("@/messages/cz.json").then((m) => m.default),
  hu: () => import("@/messages/hu.json").then((m) => m.default),
  de: () => import("@/messages/de.json").then((m) => m.default),
  en: () => import("@/messages/en.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale) {
  if (!locales.includes(locale)) {
    return dictionaries[defaultLocale]();
  }
  return dictionaries[locale]();
}
