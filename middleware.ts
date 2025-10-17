import { NextResponse } from "next/server";
import { getUserProfile } from "./lib/supabase/getUserProfile";

export async function middleware(req: Request) {
  const url = new URL(req.url);
  const userData = await getUserProfile();

  // Rotas que queremos proteger
  const protectedPaths = ["/midia", "/admin", "/dashboard", "/membros"];

  // 1️⃣ Usuário tentando acessar rota protegida sem login
  if (
    protectedPaths.some((path) => url.pathname.startsWith(path)) &&
    !userData?.user
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Checa o perfil do usuário logado
  if (userData?.user) {
    const { user, profile } = userData;

    // 2️⃣ Usuário tentando acessar /login enquanto já está logado
    if (url.pathname === "/login") {
      // 2️⃣.1 Usuário tentando é um usuário comum
      if (profile?.role === "user") {
        return NextResponse.redirect(new URL("/", req.url));
      }

      // 2️⃣.2 Usuário tem privilegios (admin, conselho, presidentes, mídia)
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // 3️⃣ Checagem de role para /admin
    if (url.pathname.startsWith("/admin") && user) {
      if (profile?.role !== "admin") {
        return NextResponse.redirect(new URL("/no-access", req.url));
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
