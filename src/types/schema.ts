import { z } from "zod"
import { LoanCategory, LoanSubcategory } from "./enum"

export const WitnessSchema = z.object({
  name: z.string().min(2, "Witness name must be at least 2 characters"),
  cnic: z.string().regex(/^\d{13}$/, "CNIC must be 13 digits"),
  phoneNumber: z.string().regex(/^\d{11}$/, "Phone number must be 1` digits"),
  email: z.string().email("Invalid email format"),
})

export const LoanApplicationSchema = z.object({
  category: z.string().refine((value) => Object.values(LoanCategory).includes(value as LoanCategory), {
    message: "Invalid loan category",
  }),
  subcategory: z.string().refine((value) => Object.values(LoanSubcategory).includes(value as LoanSubcategory), {
    message: "Invalid loan subcategory",
  }),
  loanAmount: z.coerce.number().min(1000, "Loan amount must be at least 1000"),
  loanPeriod: z.coerce.number().min(1).max(5, "Loan period must be between 1-5 years"),
  initialDeposit: z.coerce.number().optional().default(0),
  name: z.string().min(2, "Guarantor name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  phoneNumber: z.string().min(11, "Phone number must be at least 11 digits"),
  cnic: z.string().regex(/^\d{13}$/, "CNIC must be 13 digits"),
  witnesses1: WitnessSchema,
  witnesses2: WitnessSchema,
})

