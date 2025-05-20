import { MongoClient } from 'mongodb';
import { userSchema } from '../src/models/userModel';
import { noteSchema } from '../src/models/noteModel';

const uri = process.env.NEXT_ATLAS_URI;
const dbName = process.env.NEXT_ATLAS_DATABASE;

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  const db = client.db(dbName);

  // Creează sau actualizează colecțiile cu validare
  const collections = await db.listCollections().toArray();
  const collectionNames = collections.map(c => c.name);

  if (!collectionNames.includes('users')) {
    await db.createCollection('users', userSchema);
  }
  if (!collectionNames.includes('notes')) {
    await db.createCollection('notes', noteSchema);
  }

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}