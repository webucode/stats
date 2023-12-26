"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { ShowcaseSchema } from "./showcaseSchema";

const addShowcase = async (data: ShowcaseSchema) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const deviceName = data.showcase_name;
  const description = data.description;

  const { error, statusText } = await supabase
    .from("device")
    .insert({ device_name: deviceName, description: description });

  return statusText;
};

const deleteAction = async (formData: FormData) => {
  const id = formData.get("id") as unknown as number;

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.from("device").delete().eq("id", id);

  return { error };
};

export { addShowcase, deleteAction };
