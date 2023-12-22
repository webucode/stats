"use client";

import { Input } from "@/components/ui/input";
import React from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";

const formSchema = z.object({
  deviceName: z.string().min(2, { message: "ada a das dasda" }).max(10, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string(),
});

type TFormSchema = z.infer<typeof formSchema>;

export default function FormShowcase({ action }: { action: any }) {
  const [state, formAction] = useFormState(action, null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting, errors, isValidating },
  } = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
  });

  React.useEffect(() => {
    state === "Created" && reset();
  }, [state]);

  return (
    <div>
      <form action={formAction} onSubmit={() => console.log("on submit")}>
        <Input {...register("deviceName", { required: true })} />
        {errors.deviceName && (
          <p className="text-red-500">{`${errors.deviceName.message}`}</p>
        )}
        <Input {...register("description", { required: true })} />
        {/* <input {...register("deviceName", { required: true })} /> */}
        {/* <input {...register("description", { required: true })} /> */}
        <button type="submit">{isValidating ? "...Loading" : "Submit"}</button>;
      </form>
    </div>
  );
}
