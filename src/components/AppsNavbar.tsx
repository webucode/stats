import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import LogoutButton from "../app/dashboard/components/LogoutButton";
import SignOutButton from "./Button/SignOutButton";
import { Session } from "@supabase/supabase-js";

export default async function AppsNavbar() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.getSession();

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
        <div className="flex flex-row gap-4  w-full justify-between">
          <div className="flex flex-row gap-2">
            <Link href={"/"}>Home</Link>
            <Link href={"/use"}>Use</Link>
          </div>

          <div className="flex flex-row gap-2">
            <Link href={"/register"}>Register</Link>
            <Link href={"/login"}>Login</Link>

            {data && (
              <form action={signOut}>
                <input type="submit" value="Sign Out" />
              </form>
            )}
          </div>

          {/* <button onClick={handleSignOut}>Sign out</button> */}
          {/* <LogoutButton onClick={handleSignOut} /> */}
        </div>
      </div>
    </nav>
  );
}
