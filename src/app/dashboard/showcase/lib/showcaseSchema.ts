import * as z from "zod";

const showcaseSchema = z.object({
  showcase_name: z.string().min(1, { message: "This Field is required" }),
  description: z.string().min(1, { message: "This field is required" }),
});

type ShowcaseSchema = z.infer<typeof showcaseSchema>;

export { showcaseSchema };
export type { ShowcaseSchema };
