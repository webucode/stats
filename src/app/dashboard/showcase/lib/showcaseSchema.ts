import * as z from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const showcaseSchema = z.object({
  showcase_name: z.string().min(1, { message: "This Field is required" }),
  description: z.string().min(1, { message: "This field is required" }),
  image: z.any(),
});

type ShowcaseSchema = z.infer<typeof showcaseSchema>;

export { showcaseSchema };
export type { ShowcaseSchema };
