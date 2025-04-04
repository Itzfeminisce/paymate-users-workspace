import * as z from "zod";

export const profileSchema = z.object({
  phone_number: z.string()
    .min(10, "Phone number must be at least 10 digits").max(15, "Phone number must be at most 15 digits")
    .regex(/^\+?[0-9]{10,15}$/, "Phone number must be between 10-15 digits")
    .optional().transform((val) => val?.replace(/[^0-9]/g, '')),
  profilePicture: z.instanceof(File).optional(),
}).refine((data) => {
  return data.phone_number || data.profilePicture;
}, {
  message: "At least one field must be filled",
  path: ["phone_number", "profilePicture"]
});

export type ProfileFormValues = z.infer<typeof profileSchema>; 