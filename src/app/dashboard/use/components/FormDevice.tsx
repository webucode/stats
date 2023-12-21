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
    formState: { errors },
  } = useForm<Inputs>();

  React.useEffect(() => {
    state === "Created" && reset();
  }, [state]);

  return (
    <div>
      <form action={formAction}>
        <input {...register("deviceName")} />
        <input {...register("description")} />
        <button type="submit">Submit</button>;
      </form>
    </div>
  );
}
