"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export default function SignInWithGoogle() {
  const supabase = createClient();

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
      },
    });
  }

  return (
    <Button
      onClick={signInWithGoogle}
      className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary/90 transition-colors"
    >
      Entrar com Google
    </Button>
  );
}
