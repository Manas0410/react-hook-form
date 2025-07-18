import { z } from "zod";
import { patterns } from "../../constants";

export const UserSchema = z
  .intersection(
    z.object({
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
      gender: z.string().min(1, "Gender is required"),
      skills: z
        .array(z.string())
        .max(2, "A maximum of 2 skills can be selected"),
      registrationDateAndTime: z.date(),
      formerEmploymentPeriod: z
        .array(z.date())
        .min(2, "At least two dates are required for employment period")
        .max(2, "A maximum of two dates can be selected for employment period"),
      salaryRange: z
        .array(z.number())
        .min(2, "At least two numbers are required for salary range")
        .max(2, "A maximum of two numbers can be selected for salary range"),
    }),

    z.discriminatedUnion("variant", [
      z.object({ variant: z.literal("create") }),
      z.object({ variant: z.literal("edit"), id: z.string().min(1) }),
    ])
  )
  .and(
    z.union([
      z.object({ isTeacher: z.literal(false) }),
      z.object({
        isTeacher: z.literal(true),
        students: z.array(
          z.object({
            name: z.string().min(4, "minimum 4 characters are required"),
          })
        ),
      }),
    ])
  );

export type UserSchemaType = z.infer<typeof UserSchema>;

export const defaultValues: UserSchemaType = {
  name: "",
  email: "",
  states: [],
  languagesSpoken: [],
  gender: "",
  skills: [],
  registrationDateAndTime: new Date(),
  formerEmploymentPeriod: [new Date(), new Date()],
  salaryRange: [0, 2000],
  variant: "create",
  isTeacher: false,
};
