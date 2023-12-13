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
  const [state, formAction] = useFormState(action, null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  //   console.log(state);

  return (
    <>
      <p>{state}</p>
      <form action={formAction}>
        <input name="deviceName" />
        <input name="description" />
        <button type="submit">{pending ? "Loading..." : "Submit"}</button>;
      </form>
    </>
  );
}
