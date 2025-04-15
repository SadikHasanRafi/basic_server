import { ObjectId } from "mongodb";
import { IProduct } from "./product.interface.js";
import { connectToDatabase } from "../util/databaseConnection.js";

const getAllProducts = async (
  filter = {},
  page: number = 1,
  limit: number = 2
) => {
  try {
    const skip = (page - 1) * limit;
    const finalFilter = { isDeleted: { $ne: true }, ...filter };
    // Debugging the final filter and pagination values
    // console.log("Final Filter:", finalFilter);
    // console.log("Skip:", skip);
    // console.log("Limit:", limit);
    const db = await connectToDatabase();
    const products = await db.collection("products")
      .find(finalFilter)
      .skip(skip)
      .limit(limit)
      .toArray();
      
    const total = await db.collection("products").countDocuments(finalFilter);

    return { products, total };
  } catch (error) {
    console.error("Service Error (getAllProducts):", error);
    throw error;
  }
};

const addProduct = async (productData: IProduct) => {
  try {
    const db = await connectToDatabase();
    const result = await db.collection("products").insertOne(productData);
    return result;
  } catch (err) {
    console.error("Service Error (addProduct):", err);
    throw err;
  }
};

const getProductById = async (id: string) => {
  try {
    const db = await connectToDatabase();
    const product = await db.collection("products").findOne({
      _id: new ObjectId(id),
      isDeleted: { $ne: true },
    });

    if (product) {
      if (product.quantity === 0) {
        product.stock = false;
        await db.collection("products").updateOne({ _id: new ObjectId(id) }, { $set: { stock: false } });
      }
    }

    return product;
  } catch (err) {
    console.error("Service Error (getProductById):", err);
    throw err;
  }
};

const deleteProductById = async (id: string): Promise<boolean> => {
  try {
    const db = await connectToDatabase();
    const result = await db.collection("products").updateOne(
      { _id: new ObjectId(id) },
      { $set: { isDeleted: true } }
    );
    return result.modifiedCount === 1;
  } catch (err) {
    console.error("Service Error (deleteProductById):", err);
    throw err;
  }
};

// Delete multiple products by IDs (soft delete)
const deleteProductsMultiple = async (ids: string[]) => {
  try {
    const objectIdArray = ids.map((id) => new ObjectId(id));
    const db = await connectToDatabase();
    const result = await db.collection("products").updateMany(
      { _id: { $in: objectIdArray } },
      { $set: { isDeleted: true } }
    );
    return result;
  } catch (err) {
    console.error("Service Error (deleteProductsMultiple):", err);
    throw err;
  }
};

// Update product by ID
const updateProductById = async (id: string, updateData: Record<string, unknown>) => {
  try {
    const db = await connectToDatabase();
    const product = await db.collection("products").findOne({ _id: new ObjectId(id) });

    if (!product) {
      return { success: false, message: "Product not found.", id };
    }

    if (!updateData || Object.keys(updateData).length === 0) {
      return { success: false, message: "Nothing to update.", id };
    }

    const hasChanges = Object.entries(updateData).some(([key, value]) => product[key] !== value);

    if (!hasChanges) {
      return { success: false, message: "No changes detected.", id };
    }

    const result = await db.collection("products").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    return {
      success: result.modifiedCount > 0,
      message: result.modifiedCount > 0 ? "Product updated successfully" : "No document was modified",
      id,
      modifiedCount: result.modifiedCount,
    };
  } catch (err) {
    console.error("Service Error (updateProductById):", err);
    throw err;
  }
};

export const productService = {
  getAllProducts,
  addProduct,
  getProductById,
  deleteProductById,
  deleteProductsMultiple,
  updateProductById,
};
