import Link from "next/link";

import React from "react";

import getActiveUserData from "@/utils/supabase/getActiveUser";

import doSignOut from "@/utils/supabase/doSignOut";

export default async function AppsNavbar() {
  const { data, error } = await getActiveUserData();

  const signOut = async (formData: FormData) => {
    "use server";

    const { error } = await doSignOut();

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
            {!data.user && (
              <>
                <Link href={"/register"}>Register</Link>
                <Link href={"/login"}>Login</Link>
              </>
            )}

            {data.user && (
              <form action={signOut}>
                <input type="submit" value="Sign Out" />
              </form>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
