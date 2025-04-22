import { Link } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // Wait for params to resolve
  const { locale } = await params;

  // Set the locale for static rendering
  setRequestLocale(locale);

  // Use getTranslations instead of useTranslations for async components
  const t = await getTranslations();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-6">
        {/* This will display "About" or "Über uns" depending on locale */}
        {t("welcome")}
      </h1>

      <div className="mt-8">
        <Link href="/" className="px-4 py-2 bg-blue-500 text-white rounded">
          Home
        </Link>
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "de" }];
}
