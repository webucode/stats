import React from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import SubmitShowcaseButton from "./components/SubmitShowcaseButton";
import ShowcaseForm from "./components/ShowcaseForm";

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  //get current active user
  const { data } = await supabase.auth.getUser();

  if (!data.user) return redirect("/dashboard");

  let formServerState;

  const handleFormShowcase = async (
    prevState: any,
    formData: { get: (arg0: string) => string }
  ) => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const deviceName = formData.get("deviceName") as string;
    const description = formData.get("description") as string;

    const response = await supabase
      .from("device")
      .insert({ device_name: deviceName, description: description });

    // if (error) redirect("register");

    console.log(data);
    // console.log(error);

    console.log(deviceName);
    console.log("handle showcase is fired");

    return response;
  };

  return (
    <div>
      Showcase Page
      <div>Form Page</div>
      <div>
        {/* <form action={handleFormShowcase}>
          <input type="text" name="name" placeholder="Nama" />
          <input type="text" name="description" placeholder="Description" />
          <SubmitShowcaseButton />
        </form> */}

        <ShowcaseForm action={handleFormShowcase} />
      </div>
    </div>
  );
}
