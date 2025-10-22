import { NextResponse } from "next/server";
import { createServer } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = createServer();
  const { email } = await req.json();

  const { error } = await (await supabase)
    .from("push_subscriptions")
    .upsert({ topics: [] })
    .eq("endpoint", email);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
