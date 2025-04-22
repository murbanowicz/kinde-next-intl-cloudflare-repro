"use client";

import { NextIntlClientProvider } from "next-intl";

export default function IntlProvider({
  locale,
  now,
  timeZone,
  messages,
  formats,
  children,
}: {
  locale: string;
  now?: Date;
  timeZone?: string;
  messages: Record<string, string>;
  formats?: Record<string, string>;
  children: React.ReactNode;
}) {
  return (
    <NextIntlClientProvider
      locale={locale}
      now={now}
      timeZone={timeZone || "Europe/Warsaw"}
      messages={messages}
      formats={formats}
    >
      {children}
    </NextIntlClientProvider>
  );
}
