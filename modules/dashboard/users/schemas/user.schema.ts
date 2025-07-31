import { z } from "zod";

export const formSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required." }),
    email: z.string().min(1, { message: "Email is required." }).email({ message: "Email is invalid." }),
    role: z.string().min(1, { message: "Role is required." }),
    password: z.string().min(1, { message: "Password is required." }),
  })

export type UserSchema = z.infer<typeof formSchema>;

export const editSchema = z
  .object({
    uuid: z.string(),
    isActive: z.boolean(),
    role: z.string().min(1, { message: "Role is required." }),
    passwrord: z.string().optional(),
    name: z.string().min(1, { message: "Name is required." }),
  })

  export type UserEditSchema = z.infer<typeof editSchema>;