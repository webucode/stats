"use client";

export default function SignOutButton({
  signOut,
}: {
  signOut: () => Promise<void>;
}) {
  console.log("ads");
  return <button onClick={signOut}>SignOutButton</button>;
}
