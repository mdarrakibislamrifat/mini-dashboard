import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      unique: true,
      trim: true,
    },
    sku: {
      type: String,
      required: [true, "SKU is required"],
      uppercase: true,
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["Electronics", "Furniture", "Clothing"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be positive"],
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    description: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: null,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

let productModel: mongoose.Model<any> | null = null;

export function getProductModel() {
  if (!productModel) {
    productModel =
      mongoose.models.Product || mongoose.model("Product", productSchema);
  }
  return productModel;
}

// For backward compatibility with direct imports
export const Product = new Proxy(
  {},
  {
    get: (target, prop) => {
      const model = getProductModel();
      return (model as any)[prop];
    },
  }
) as any;
