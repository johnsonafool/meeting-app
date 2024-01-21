import { authMiddleware } from "@clerk/nextjs";

export const isContainer = process.env.MEETING_APP_MODE === "docker";

function middleware() {
  return;
}

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default !isContainer ? authMiddleware({}) : middleware;

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
