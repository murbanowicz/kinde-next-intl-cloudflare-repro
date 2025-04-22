import { Link } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function HomePage({
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
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-green-100">
      <div className="bg-green-600 text-white p-8 rounded-lg max-w-lg mb-8">
        <h1 className="text-4xl font-bold mb-6">SUCCESS</h1>
        <p className="text-xl mb-4">Middleware working as expected!</p>
        <p className="text-lg">
          This is a localized route and the middleware is correctly routing to
          it.
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-4">{t("welcome")}</h2>

      <div className="mt-8 flex space-x-4">
        <Link
          href="/"
          locale="en"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          English
        </Link>
        <Link
          href="/"
          locale="de"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Deutsch
        </Link>
      </div>

      <div className="mt-8">
        <Link
          href="/about"
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          About Page
        </Link>
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "de" }];
}
