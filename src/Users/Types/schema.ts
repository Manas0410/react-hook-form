import { z } from "zod";
import { patterns } from "../../constants";

export const UserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .min(1, "email is required")
    .refine((email) => patterns.email.test(email), {
      message: "Invalid email format",
    }),
});

export type UserSchemaType = z.infer<typeof UserSchema>;
