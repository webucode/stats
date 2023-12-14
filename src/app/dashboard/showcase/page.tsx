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

  if (!data.user) return redirect("/dashboard");

  const handleFormShowcase = async (
    prevState: any,
    formData: { get: (arg0: string) => string }
  ) => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const deviceName = formData.get("deviceName") as string;
    const description = formData.get("description") as string;

    const { data, error, statusText } = await supabase
      .from("device")
      .insert({ device_name: deviceName, description: description });

    return statusText;
  };

  const showcaseData = null;

  return (
    <div>
      Showcase Page
      <div>Showcase List</div>
      <div>
        <ListShowcase data={showcaseData} />
      </div>
      <div>Form Page</div>
      <div>
        <ShowcaseForm action={handleFormShowcase} />
      </div>
    </div>
  );
}
