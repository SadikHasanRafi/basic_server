// src/validations/product.validation.ts

import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters").trim(),
  brand: z.string().trim().min(1, "Brand is required"),
  model: z.string().trim().min(1, "Model is required"),
  price: z.number().min(0, "Price cannot be negative"),
  stock: z.boolean().default(true),
  image: z
    .string()
    .url("Image must be a valid URL")
    .regex(/\.(jpg|jpeg|png|webp|svg|gif)$/i, "Must be a valid image URL")
    .optional(),
  quantity: z.number().min(0, "Quantity cannot be negative").default(1),
  about: z.string().max(500, "About section too long").optional(),
  isDeleted: z.boolean().default(false),
});

export type ProductType = z.infer<typeof productSchema>;
