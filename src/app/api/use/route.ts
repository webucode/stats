import wait from "@/lib/wait";

export async function GET(request: Request) {
  const usesData = {
    data: [{ title: "Desk" }, { title: "Microphone" }],
  };

  return Response.Json(usesData);
}
