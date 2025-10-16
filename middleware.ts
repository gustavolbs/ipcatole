import { NextResponse } from "next/server";
import { createServer } from "@/lib/supabase/server";

export async function middleware(req: Request) {
  const url = new URL(req.url);
  const supabase = createServer();

  // Pega usuário logado
  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  // Rotas que queremos proteger
  const protectedPaths = ["/midia", "/admin"];

  // 1️⃣ Usuário tentando acessar rota protegida sem login
  if (protectedPaths.some((path) => url.pathname.startsWith(path)) && !user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Checa o perfil do usuário logado
  if (user) {
    const { data: profile } = await (await supabase)
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    // 2️⃣ Usuário tentando acessar /login enquanto já está logado
    if (url.pathname === "/login") {
      // 2️⃣.1 Usuário tentando é um usuário comum
      if (profile?.role === "user") {
        return NextResponse.redirect(new URL("/", req.url));
      }

      // 2️⃣.2 Usuário tem privilegios (admin, conselho, presidentes)
      return NextResponse.redirect(new URL("/midia", req.url));
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
  matcher: ["/login", "/midia/:path*", "/admin/:path*"],
};
