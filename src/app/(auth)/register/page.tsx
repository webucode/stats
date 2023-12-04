import { createClient } from "@/utils/supabase/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { redirect } from "next/navigation";
import { headers, cookies } from "next/headers";
import { useState } from "react";

export default async function Page() {
  const [loading, setLoading] = useState(false);

  const signUp = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      return redirect("/register");
    }

    return redirect("/dashboard");
  };

  return (
    <div>
      sign up form
      <form action={signUp}>
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">{loading ? "submit" : "loading"}</button>
      </form>
    </div>
  );
}
