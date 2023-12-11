import { cookies } from "next/headers";
import { createClient } from "./server";

export default async function getActiveUser() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const response = await supabase.auth.getUser();

  return response;
}
