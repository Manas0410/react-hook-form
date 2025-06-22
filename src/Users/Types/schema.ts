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
  states: z
    .array(z.string())
    .min(1, "At least one state is required")
    .max(2, "A maximum of 2  states can be selected"),

  languagesSpoken: z.array(z.string()),
});

export type UserSchemaType = z.infer<typeof UserSchema>;

export const defaultValues: UserSchemaType = {
  name: "",
  email: "",
  states: [],
  languagesSpoken: [],
};
