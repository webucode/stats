import React, { ReactNode, createContext, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const AuthContext = createContext<{
  session: Session | null | undefined;
  user: User | null | undefined;
  signOut: () => void;
}>({
  session: null,
  user: null,
  signOut: () => {},
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>();
  const [session, setSession] = useState<Session | null | undefined>();

  const cookiesStore = cookies();
  const supabase = createClient(cookiesStore);

  const value = {
    session,
    user,
    signOut: () => supabase.auth.signOut(),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
