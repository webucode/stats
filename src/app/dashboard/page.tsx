import React from "react";
import LogoutButton from "./components/LogoutButton";
import { useRouter } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { createServerClient } from "@supabase/ssr";

export default async function Page() {
  // const handleSignOut = async () => {
  //   const router = useRouter();
  //   const cookieStore = cookies();
  //   const supabase = createClient(cookieStore);

  //   await supabase.auth.signOut();

  //   console.log("this is on server");
  //   return router.refresh();
  // };

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase.auth.getUser();
  console.log(data);

  if (!data.user) return <div>anda belum login</div>;

  return (
    <div>
      this is dashboard page
      {/* <LogoutButton onClick={handleSignOut} /> */}
    </div>
  );
}
