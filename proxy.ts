import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// On définit quelles pages sont "protégées" (tout ce qui est dans /dashboard)
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect() // Si pas connecté, renvoie vers la page de login de Clerk !
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}