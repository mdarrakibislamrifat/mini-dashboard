import { z } from "zod";

const Categories = ["Electronics", "Furniture", "Clothing"] as const;

export const productFormSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  sku: z.string().min(1, "SKU is required"),
  category: z.enum(Categories),
  price: z.preprocess((val) => {
    const num = Number(val);
    if (isNaN(num)) throw new Error("Price must be a number");
    return num;
  }, z.number().min(0, "Price must be greater than or equal to 0")),
  stock: z.preprocess((val) => {
    const num = Number(val);
    if (isNaN(num)) throw new Error("Stock must be a number");
    return num;
  }, z.number().int().min(0, "Stock must be a non-negative integer")),
  description: z.string().min(1, "Description is required"),
  active: z.boolean(),
  image: z.string().nullable().optional(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
