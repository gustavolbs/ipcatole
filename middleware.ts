import { NextResponse, type NextRequest } from "next/server";
import { getUserProfile } from "./lib/supabase/getUserProfile";
import { updateSession } from "./lib/supabase/updateSession";

export async function middleware(request: NextRequest) {
  // First, let Supabase sync the session & cookies. `updateSession` may
  // return a redirect (e.g. to /login) or NextResponse.next() with cookies set.
  const sessionResponse = await updateSession(request);

  // If updateSession returned a redirect (or any response with a Location
  // header), return it immediately so the browser follows the redirect.
  if (sessionResponse.headers.get("location")) {
    return sessionResponse;
  }

  const url = new URL(request.url);
  const userData = await getUserProfile();

  // 1️⃣ Usuário tentando acessar rota protegida sem login
  if (
    protectedPaths.some((path) => url.pathname.startsWith(path)) &&
    !userData?.user
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Checa o perfil do usuário logado
  if (userData?.user) {
    const { user, profile } = userData;

    // 2️⃣ Usuário tentando acessar /login enquanto já está logado
    if (url.pathname === "/login") {
      // 2️⃣.1 Usuário tentando é um usuário comum
      if (profile?.role === "user") {
        return NextResponse.redirect(new URL("/", request.url));
      }

      // 2️⃣.2 Usuário tem privilegios (admin, conselho, presidentes, mídia)
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // 3️⃣ Checagem de role para /admin
    if (url.pathname.startsWith("/admin") && user) {
      if (profile?.role !== "admin") {
        return NextResponse.redirect(new URL("/no-access", request.url));
      }
    }
  }

  return NextResponse.next();
}

// Configura quais rotas o middleware deve rodar
export const config = {
  matcher: [
    "/login",
    "/midia/:path*",
    "/admin/:path*",
    "/dashboard/:path*",
    "/membros/:path*",
  ],
};

// Rotas que queremos proteger
const protectedPaths = [
  "/midia",
  "/admin",
  "/dashboard",
  "/membros",
  "/pedidos-oracao",
];
