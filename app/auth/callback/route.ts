import { createServer } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createServer();
    await (await supabase).auth.exchangeCodeForSession(code);
  }

  // redireciona pra área protegida
  return NextResponse.redirect(new URL("/dashboard", request.url));
}
