import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import createMiddleware from "next-intl/middleware";
import { type NextRequest } from "next/server";

import { routing } from "@/i18n/routing";

// Create the i18n middleware
const i18nMiddleware = createMiddleware(routing);

// Use Kinde auth middleware with i18n middleware as callback
const middleware = withAuth(
  // Simply return the i18n middleware
  (req: NextRequest) => {
    return i18nMiddleware(req);
  },
  {
    isAuthorized: () => true, // Always authorize for reproduction
  }
);

export default middleware;

export const config = {
  matcher: ["/((?!api|static|studio|.*\\..*|_next).*)"],
};
