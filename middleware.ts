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

  // 1️⃣ Usuário tentando acessar rota protegida sem login
  if (protectedPaths.some((path) => url.pathname.startsWith(path))) {
    const userData = await getUserProfile();

    if (!userData?.user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Checa o perfil do usuário logado
    if (userData?.user) {
      // 2️⃣ Usuário tentando acessar /login enquanto já está logado
      if (url.pathname === "/login") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
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
    "/pedidos-oracao/:path*",
    "/notificacoes/:path*",
    "/preferences/:path*",
  ],
};

// Rotas que queremos proteger
const protectedPaths = [
  "/midia",
  "/admin",
  "/dashboard",
  "/membros",
  "/pedidos-oracao",
  "/notificacoes",
  "/preferences",
];
