import { MongoClient } from 'mongodb';

const uri = process.env.NEXT_ATLAS_URI;
const dbName = process.env.NEXT_ATLAS_DATABASE;
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    ssl: true, 
    tls: true, 
    tlsInsecure: false, 
    tlsAllowInvalidCertificates: false, 
    serverSelectionTimeoutMS: 5000, 
    heartbeatFrequencyMS: 10000, 
};

let client;
let clientPromise;

if (!uri) {
    throw new Error('Please add your MongoDB URI to .env.local or Vercel environment variables');
}

if (!dbName) {
    throw new Error('Please add your MongoDB database name to .env.local or Vercel environment variables');
}

if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export async function connectToDatabase() {
    try {
        const client = await clientPromise;
        console.log('MongoDB client connected successfully');
        const db = client.db(dbName);
        return { db, client };
    } catch (err) {
        console.error('MongoDB connection error:', err.message, err.stack);
        throw err;
    }
}