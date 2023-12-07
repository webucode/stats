import { createClient } from "@/utils/supabase/server";
import SubmitButton from "../components/SubmitButton";
import { cookies } from "next/headers";
import { redirect, useRouter } from "next/navigation";

export default function Page() {
  const signIn = async (formData: FormData) => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) redirect("register");

    return redirect("/dashboard");
  };

  // const handleSignOut = async () => {
  //   await supabase.auth.signOut();
  //   router.refresh();
  // };

  return (
    <main className="h-screen flex items-center justify-center bg-gray-800 p-6">
      sign in form
      <form action={signIn}>
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <SubmitButton />
      </form>
    </main>
  );
}
