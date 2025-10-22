import dbConnect from "@/lib/mongodb";

export async function GET() {
  try {
    await dbConnect();

    return Response.json(
      {
        status: "success",
        message: "MongoDB connected successfully",
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[v0] Database connection error:", error);

    return Response.json(
      {
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to connect to MongoDB",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
