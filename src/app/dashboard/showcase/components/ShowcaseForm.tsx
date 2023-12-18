"use client";

import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useForm, Form } from "react-hook-form";

type Inputs = {
  deviceName: string;
  description: string;
};

export default function ShowcaseForm({ action }: { action: any }) {
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(action, null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  return (
    <div>
      <form action={formAction}>
        <input {...register("deviceName")} />
        <input {...register("description")} />
        <button type="submit">{pending ? "Loading..." : "Submit"}</button>;
      </form>
    </div>
  );
}
