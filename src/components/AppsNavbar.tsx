import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import LogoutButton from "../app/dashboard/components/LogoutButton";
import SignOutButton from "./Button/SignOutButton";
import { Session } from "@supabase/supabase-js";

export default async function AppsNavbar({
  session,
}: {
  session: Session | null;
}) {
  const isLoggedIn = async () => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase.auth.getSession();

    return data;
  };

  const signOut = async (formData: FormData) => {
    "use server";
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data } = await supabase.auth.getUser();

    console.log(data);

    const { error } = await supabase.auth.signOut();

    console.log(data);
    console.log("trying to signout");

    return;
  };

  return (
    <nav className="bg-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex flex-row gap-4 ">
          <Link href={"/use"}>use</Link>
          <Link href={"/register"}>register</Link>
          <Link href={"/login"}>login</Link>

          {session && (
            <form action={signOut}>
              <input type="submit" />
            </form>
          )}

          {/* <button onClick={handleSignOut}>Sign out</button> */}
          {/* <LogoutButton onClick={handleSignOut} /> */}
        </div>
      </div>
    </nav>
  );
}
