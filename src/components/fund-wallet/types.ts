import * as z from "zod";

export const fundingSchema = z.object({
  amount: z.number()
    .min(1, { message: "Amount is required" })
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Amount must be a positive number",
    }),
  note: z.string().optional(),
});

export type FundingFormValues = z.infer<typeof fundingSchema>; 