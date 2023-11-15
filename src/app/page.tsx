import Image from "next/image";
import AppsContainer from "@/components/AppsContainer";
import AppsNavbar from "@/components/AppsNavbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AppsNavbar />
      <AppsContainer>
        <div>this is home page</div>
      </AppsContainer>
    </main>
  );
}
  