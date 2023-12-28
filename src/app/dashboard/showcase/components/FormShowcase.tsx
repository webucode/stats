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
  showcase_name: "",
  description: "",
  image: null,
};

export default function FormShowcaseZod() {
  const form = useForm<ShowcaseSchema>({
    resolver: zodResolver(showcaseSchema),
    defaultValues,
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: ShowcaseSchema) => {
    const response = await addShowcase(data);

    response === "Created" && form.reset();
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="showcase_name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input {...field} type="file" />
                  </FormControl>
                  <FormDescription>Recomended with 120x360 px</FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button className="mt-3 min-w-40" type="submit">
            {isSubmitting ? "Loading" : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
