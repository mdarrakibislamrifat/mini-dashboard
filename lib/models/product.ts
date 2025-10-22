import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    sku: { type: String, required: true, uppercase: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["Electronics", "Furniture", "Clothing"],
    },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0, default: 0 },
    description: { type: String, default: "" },
    image: { type: String, default: null },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
