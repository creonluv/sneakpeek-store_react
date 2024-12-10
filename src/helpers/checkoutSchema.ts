import { z } from "zod";

export const checkoutSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .regex(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ'’ʼ\s-]+$/, {
      message:
        "Name must contain only letters, spaces, hyphens, or apostrophes",
    }),
  surname: z
    .string()
    .min(1, { message: "Surname is required" })
    .regex(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ'’ʼ\s-]+$/, {
      message:
        "Surname must contain only letters, spaces, hyphens, or apostrophes",
    }),
  phone_number: z
    .string()
    .min(1, { message: "Phone number is required" })
    .regex(/^\+380\d{9}$/, {
      message: "Phone number must be in the format +380XXXXXXXXX",
    }),
  delivery_type: z.preprocess(
    (val) => (val === true ? "home" : "branch"),
    z.enum(["branch", "home"])
  ),
  shipment_method: z
    .string()
    .min(1, { message: "Shipment method is required" }),
  city: z.string().optional(),
  state: z.string().optional(),
  street: z.string().optional(),
  apartment: z.string().optional(),
  branch_id: z.string().optional(),
  branch_address: z.string().optional(),
  terms: z
    .boolean()
    .refine((val) => val === true, { message: "You must accept the terms" }),
  cardNumber: z
    .string()
    .min(16, { message: "Card number must be 16 digits" })
    .max(16, { message: "Card number must be 16 digits" })
    .regex(/^\d{16}$/, {
      message: "Card number must be a valid 16-digit number",
    }),
  expirationDate: z
    .string()
    .min(1, { message: "Expiration date must be in MM/YY format" }),
  securityCode: z
    .string()
    .min(3, { message: "Security code must be 3 digits" })
    .max(3, { message: "Security code must be 3 digits" })
    .regex(/^\d{3}$/, { message: "Security code must be a 3-digit number" }),
});
