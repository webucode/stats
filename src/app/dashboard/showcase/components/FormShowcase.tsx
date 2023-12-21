"use client";

import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";

type Inputs = {
  deviceName: string;
  description: string;
};

export default function FormShowcase({ action }: { action: any }) {
  const [state, formAction] = useFormState(action, null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting, errors, isValidating },
  } = useForm<Inputs>();

  React.useEffect(() => {
    state === "Created" && reset();
  }, [state]);

  return (
    <div>
      <form action={formAction} onSubmit={() => console.log("on submit")}>
        <input {...register("deviceName", { required: true })} />
        <input {...register("description", { required: true })} />
        <button type="submit">{isValidating ? "...Loading" : "Submit"}</button>;
      </form>
    </div>
  );
}
