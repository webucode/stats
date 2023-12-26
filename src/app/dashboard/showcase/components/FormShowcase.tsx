"use client";

import React from "react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addShowcase } from "../lib/showcaseAction";
import { showcaseSchema, ShowcaseSchema } from "../lib/showcaseSchema";

const defaultValues: Partial<ShowcaseSchema> = {
  showcase_name: "this is device name",
  description: "this is showcase description",
};

export default function FormShowcaseZod() {
  const form = useForm<ShowcaseSchema>({
    resolver: zodResolver(showcaseSchema),
    defaultValues,
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: ShowcaseSchema) => {
    const response = await addShowcase(data);

    console.log(response);
  };

  return (
    <div>
      <p>FormShowcaseZod</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="showcase_name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Device Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Device Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button type="submit">{isSubmitting ? "Loading" : "Submit"}</Button>
        </form>
      </Form>
    </div>
  );
}
