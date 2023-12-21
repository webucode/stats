import React from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
// import ListShowcase from "./components/ListShowcase";
import { randomUUID } from "crypto";
import ListDevice from "./components/ListDevice";
import FormDevice from "./components/FormDevice";
// import FormShowcase from "./components/FormShowcase";

export default async function Page() {
  //get cookies
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  //get current active user
  const { data } = await supabase.auth.getUser();
  //if not logged in will redirect to login page
  if (!data.user) return redirect("/");

  const insertAction = async (
    prevState: any,
    formData: { get: (arg0: string) => string }
  ) => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const deviceName = formData.get("deviceName") as string;
    const description = formData.get("description") as string;

    const { error, statusText } = await supabase
      .from("device")
      .insert({ device_name: deviceName, description: description });

    return statusText + randomUUID();
  };

  const deleteAction = async (formData: FormData) => {
    "use server";

    const id = formData.get("id") as unknown as number;

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.from("device").delete().eq("id", id);

    return { error };
  };

  //Get Showcase data on server
  const showcaseData = await supabase.from("device").select();

  return (
    <div>
      Showcase Page
      <div>
        <ListDevice action={deleteAction} data={showcaseData.data ?? []} />
      </div>
      <div>
        <FormDevice action={insertAction} />
      </div>
    </div>
  );
}
