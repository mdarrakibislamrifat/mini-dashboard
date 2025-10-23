import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(" MONGODB_URI not found in environment variables.");
}

// Extend global type to persist connection cache during hot reloads
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

const cached = global.mongooseCache || (global.mongooseCache = { conn: null, promise: null });

export default async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      connectTimeoutMS: 20000, // 20s timeout
      serverSelectionTimeoutMS: 20000, // wait longer for Atlas
      socketTimeoutMS: 45000, // handle ECONNRESET gracefully
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("✅ MongoDB connected successfully!");
        return mongoose;
      })
      .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
        cached.promise = null; // reset cache on failure
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
