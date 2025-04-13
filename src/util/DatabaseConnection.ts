import { MongoClient, ServerApiVersion } from "mongodb";


const uri = "mongodb+srv://codeerid13255:sadikhasan13255@cluster0.y6eux.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


let isConnected = false;

export const connectToDatabase = async () => {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
    console.log("MongoDB connected successfully");
  }
  return client.db("goriber-cycle-store");
};

export { client }; 