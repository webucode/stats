import React from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import ListShowcase from "./components/ListShowcase";
import { randomUUID } from "crypto";
import FormShowcase from "./components/FormShowcase";
import { deleteAction } from "./lib/showcaseAction";
import { Separator } from "@/components/ui/separator";

export default async function Page() {
  //get cookies
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  //get current active user
  const { data } = await supabase.auth.getUser();

  //if not logged in will redirect to login page
  if (!data.user) return redirect("/");

  //Get Showcase data on server
  const showcaseData = await supabase.from("device").select();

  return (
    <div>
      <div>
        <ListShowcase action={deleteAction} data={showcaseData.data ?? []} />
      </div>
      <Separator className="my-6" />
      <div>
        <FormShowcase />
      </div>
    </div>
  );
}
