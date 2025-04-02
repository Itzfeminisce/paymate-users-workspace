import * as z from "zod";

export const fundingSchema = z.object({
  amount: z.string()
    .min(1, { message: "Amount is required" })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Amount must be a positive number",
    }),
  note: z.string().optional(),
});

export type FundingFormValues = z.infer<typeof fundingSchema>; 