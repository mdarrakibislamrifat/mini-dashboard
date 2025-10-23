import dbConnect from "@/lib/mongodb";
import { Product } from "@/lib/models/product";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  if (!id || !isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
  }

  try {
    await dbConnect();

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      status: "success",
      data: {
        _id: product._id.toString(),
        ...product.toObject(),
      },
    });
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}


// Delete product
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  // Unwrap the params promise
  const { id } = await context.params;

  if (!id || !isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
  }

  try {
    await dbConnect();

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      status: "success",
      message: "Product deleted successfully",
      data: {
        _id: deletedProduct._id.toString(),
        ...deletedProduct.toObject(),
      },
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
