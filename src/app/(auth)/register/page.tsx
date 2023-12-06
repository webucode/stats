import { createClient } from "@/utils/supabase/server";
import { redirect, useRouter } from "next/navigation";
import { cookies } from "next/headers";
import SubmitButton from "../components/SubmitButton";

export default async function Page() {
  const signUp = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      return redirect("/register");
    }

    return redirect("/dashboard");
  };

  const handleSignOut = async () => {
    "use server";

    const router = useRouter();
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    await supabase.auth.signOut();
    return router.refresh();
  };

  return (
    <div>
      sign up form
      <form action={signUp}>
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <SubmitButton />
        <button onClick={handleSignOut}>Sign out</button>
      </form>
    </div>
  );
}
