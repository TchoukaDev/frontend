const { MongoClient } = require("mongodb");

const DB_NAME = process.env.MONGODB_DATABASE;

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI n'est pas défini");
}

// Pour éviter de créer plusieurs connexions en dev avec Next.js Hot Reload
if (process.env.NODE_ENV === "development") {
  // Global variable
  if (!global._mongoClientPromise) {
    client = new MongoClient(process.env.MONGODB_URI);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(process.env.MONGODB_URI);
  clientPromise = client.connect();
}

/**
 * Fonction pour récupérer directement une collection
 * @param {string} collectionName Nom de la collection
 * @returns {Promise<import('mongodb').Collection>} Collection MongoDB
 */
export async function getCollection(collectionName) {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  return db.collection(collectionName);
}
