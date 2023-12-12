"use client";

import { useFormStatus } from "react-dom";

export default function SubmitShowcaseButton() {
  const { pending } = useFormStatus();

  return <button type="submit">{pending ? "loading..." : "Submit"}</button>;
}
