import dbConnect from "@/lib/mongodb";
import { Product } from "@/lib/models/product";
import { productFormSchema } from "@/lib/schemas/product-validation";
import { z } from "zod";

export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({});
    return Response.json(
      {
        status: "success",
        data: products,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[v0] Error fetching products:", error);
    return Response.json(
      {
        status: "error",
        message:
          error instanceof Error ? error.message : "Failed to fetch products",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();

    // Validate request body
    const validatedData = productFormSchema.parse(body);

    // Check if product name already exists
    const existingProduct = await Product.findOne({ name: validatedData.name });
    if (existingProduct) {
      return Response.json(
        {
          status: "error",
          message: "Product name already exists",
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    // Create new product
    const product = new Product({
      ...validatedData,
      sku: validatedData.sku.toUpperCase(),
    });

    await product.save();

    return Response.json(
      {
        status: "success",
        message: "Product created successfully",
        data: product,
        timestamp: new Date().toISOString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[v0] Error creating product:", error);

    if (error instanceof z.ZodError) {
      return Response.json(
        {
          status: "error",
          message: "Validation error",
          errors: error.flatten(),
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    return Response.json(
      {
        status: "error",
        message:
          error instanceof Error ? error.message : "Failed to create product",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
