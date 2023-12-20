import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function deleteShowcase(id: number, cookieStore: any) {
  const supabase = createClient(cookieStore);

  const { error } = await supabase.from("device").delete().eq("id", id);

  return error;
}
