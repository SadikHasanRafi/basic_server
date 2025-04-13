import { connectToDatabase } from "../util/DatabaseConnection.js";
import { IProduct } from "./product.interface.js";

const getAllProduct = async () => {
    try {
      const db = await connectToDatabase();
      const collection = db.collection("products");
      const products = await collection.find().toArray();
      return products;
    } catch (err) {
      console.error("Service Error:", err);
      throw err;
    }
  };

const addProduct = async (productData: IProduct) => {
try {
    const db = await connectToDatabase();
    const collection = db.collection("products");

    const result = await collection.insertOne(productData);
    return result;
} catch (err) {
    console.error("Service Error:", err);
    throw err;
}
};

export const productService = {
  getAllProduct,
  addProduct
};
