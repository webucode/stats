"use client";

import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";

type Inputs = {
  deviceName: string;
  description: string;
};

export default function ShowcaseForm({ action }: { action: any }) {
  const { pending } = useFormStatus();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  return (
    <form action={action}>
      <input name="deviceName" />
      <input name="description" />
      <button type="submit">{pending ? "loading..." : "Submit"}</button>;
    </form>
  );
}
