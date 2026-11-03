import { MongoClient, Db } from "mongodb";
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

export async function connectDB(): Promise<Db> {
  if (db) return db;

  const uri = getMongoUri();
  client = new MongoClient(uri);

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
