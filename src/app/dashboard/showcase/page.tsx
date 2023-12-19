import React from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import ShowcaseForm from "./components/ShowcaseForm";
import ListShowcase from "./components/ListShowcase";

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  //get current active user
  const { data } = await supabase.auth.getUser();
  //if not logged in di redirect to homepage
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

    return { error, statusText };
  };

  const deleteAction = async (formData: FormData) => {
    "use server";

    const id = formData.get("id") as unknown as number;

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.from("device").delete().eq("id", id);

    return { error };
  };

  const showcaseData = await supabase.from("device").select();
  console.log(showcaseData.data);

  return (
    <div>
      Showcase Page
      <div>Showcase List</div>
      <div>
        <ListShowcase action={deleteAction} data={showcaseData.data ?? []} />
      </div>
      <div>Form Page</div>
      <div>
        <ShowcaseForm action={insertAction} />
      </div>
    </div>
  );
}
