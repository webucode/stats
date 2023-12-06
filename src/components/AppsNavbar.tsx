import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import LogoutButton from "../app/dashboard/components/LogoutButton";

export default function AppsNavbar() {
  // const handleSignOut = async () => {
  //   "use server";

  //   const cookieStore = cookies();
  //   const supabase = createClient(cookieStore);
  //   const { error } = await supabase.auth.signOut();

  //   if (error) {
  //     return redirect("/dahsboard");
  //   }

  //   return redirect("/");
  // };

  return (
    <nav className="bg-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex flex-row gap-4 ">
          <Link href={"/use"}>use</Link>
          <Link href={"/register"}>register</Link>
          <Link href={"/login"}>login</Link>
          {/* <button onClick={handleSignOut}>Sign out</button> */}
          {/* <LogoutButton onClick={handleSignOut} /> */}
        </div>
      </div>
    </nav>
  );
}
