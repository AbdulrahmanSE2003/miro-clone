import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// حدد هنا الصفحات اللي "أي حد" ينفع يشوفها (زي صفحة Landing مثلاً)
const isPublicRoute = createRouteMatcher(["/welcome"]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
