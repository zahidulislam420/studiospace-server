import { MongoClient, MongoClientOptions, Db } from "mongodb";
import { ENV } from "./env";

let client: MongoClient | null = null;
let db: Db | null = null;

export function getMongoUri(): string {
  let uri = ENV.MONGODB_URI;
  if (ENV.DBUSER && ENV.DBPASSWORD) {
    uri = uri
      .replace(/\${DBUSER}/g, encodeURIComponent(ENV.DBUSER))
      .replace(/\${DBPASSWORD}/g, encodeURIComponent(ENV.DBPASSWORD))
      .replace(/<DBUSER>/g, encodeURIComponent(ENV.DBUSER))
      .replace(/<DBPASSWORD>/g, encodeURIComponent(ENV.DBPASSWORD));
  }
  return uri;
}

export const mongoOptions: MongoClientOptions = {
  tls: true,
  tlsAllowInvalidCertificates: false,
  serverSelectionTimeoutMS: 15000,
  connectTimeoutMS: 15000,
  socketTimeoutMS: 45000,
  retryWrites: true,
  w: "majority",
  maxPoolSize: 10,
  minPoolSize: 1,
};

export async function connectDB(): Promise<Db> {
  if (db) return db;

  const uri = getMongoUri();
  const isSrv = uri.startsWith("mongodb+srv://");
  const options: MongoClientOptions = isSrv
    ? mongoOptions
    : { retryWrites: true };

  client = new MongoClient(uri, options);

  try {
    await client.connect();
    db = client.db("studiospace");
    console.log("Successfully connected to MongoDB database: studiospace");
    return db;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}

export function getDB(): Db {
  if (!db) {
    throw new Error("Database not connected. Call connectDB() before accessing the database.");
  }
  return db;
}

export async function closeDB(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
}
