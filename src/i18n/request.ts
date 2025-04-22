import { getRequestConfig } from "next-intl/server";

import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
    locale,
  };
});

// Helper function to get messages for a specific locale
export async function getMessages(locale: string) {
  return (await import(`./messages/${locale}.json`)).default;
}
