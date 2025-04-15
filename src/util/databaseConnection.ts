import { MongoClient, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";

const uri = "mongodb+srv://codeerid13255:sadikhasan13255@cluster0.y6eux.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let isConnected = false;

const connectToDatabase = async () => {
  if (!isConnected) {
    await client.connect();
    await mongoose.connect(uri, {
      dbName: "goriber-cycle-store",
      serverSelectionTimeoutMS: 5000,
    });    
    
    isConnected = true;
    console.log("MongoDB connected successfully");
  }
  return client.db("goriber-cycle-store");
};


const closeConnection = async () => {
  await client.close();
  await mongoose.connection.close();
}
 
export { client, connectToDatabase, closeConnection };
