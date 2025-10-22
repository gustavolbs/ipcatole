import { NextResponse } from "next/server";
import { createServer } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = createServer();
  const body = await req.json();

  const { endpoint, name, topics } = body;

  const { error } = await (await supabase)
    .from("push_subscriptions")
    .update({ endpoint, name, topics })
    .eq("endpoint", endpoint);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
