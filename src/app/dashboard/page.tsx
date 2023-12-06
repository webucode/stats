import React from "react";
import LogoutButton from "./components/LogoutButton";
import { useRouter } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export default function Page() {
  const handleSignOut = async () => {
    const router = useRouter();
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    await supabase.auth.signOut();

    console.log("this is on server");
    return router.refresh();
  };

  return (
    <div>
      this is dashboard page
      <LogoutButton onClick={handleSignOut} />
    </div>
  );
}
