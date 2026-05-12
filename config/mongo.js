import mongoose from "mongoose";

let cached = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

const connectMongo = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error("MONGODB_URI is not set");
    }

    cached.promise = mongoose.connect(mongoUri).then((mongo) => mongo);
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectMongo;