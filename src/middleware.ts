import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";

import { routing } from "@/i18n/routing";

// Create the i18n middleware
const i18nMiddleware = createMiddleware(routing);

// Export middleware with withAuth wrapper
const authMiddleware = withAuth(
  // This function will be called by Kinde after authentication
  function middleware(req: NextRequest) {
    // Apply i18n middleware
    const result = i18nMiddleware(req);
    return result;
  },
  {
    isAuthorized: () => true, // Always authorize for reproduction
  }
);

export default async function middleware(req: NextRequest) {
  return NextResponse.next();
  const result = await (
    authMiddleware as unknown as (req: NextRequest) => Promise<NextResponse>
  )(req);

  // Remove x-middleware-next header - it should mot be returned from middleware
  // waiting for Kinde to fix the issue in their sdk
  result.headers.delete("x-middleware-next");
  return result;
}

export const config = {
  matcher: ["/((?!api|static|studio|.*\\..*|_next).*)"],
};
