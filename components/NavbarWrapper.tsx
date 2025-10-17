import Navbar from "./Navbar";
import { getUserProfile } from "@/lib/supabase/getUserProfile";

export default async function NavbarWrapper() {
  const userData = await getUserProfile();

  return <Navbar user={userData?.user.user_metadata.name ?? null} />;
}
