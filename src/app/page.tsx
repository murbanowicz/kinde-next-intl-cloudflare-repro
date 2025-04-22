export default function RootPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-red-100">
      <div className="bg-red-600 text-white p-8 rounded-lg max-w-lg">
        <h1 className="text-4xl font-bold mb-6">ERROR</h1>
        <p className="text-xl mb-4">This page should never be displayed!</p>
        <p className="text-lg">
          The middleware should have redirected to a localized route (/en or
          /de). If you see this page, the middleware is not working correctly.
        </p>
      </div>
    </main>
  );
}
