import { z } from "zod";

export const productFormSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .min(3, "Name must be at least 3 characters"),
  sku: z
    .string()
    .min(1, "SKU is required")
    .min(2, "SKU must be at least 2 characters"),
  category: z
    .enum(["Electronics", "Furniture", "Clothing"])
    .refine((val) => ["Electronics", "Furniture", "Clothing"].includes(val), {
      message: "Please select a valid category",
    }),
  price: z.coerce.number().positive("Price must be positive"),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
  description: z.string().optional().default(""),
  image: z.string().optional().nullable(),
  active: z.boolean().default(true),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
