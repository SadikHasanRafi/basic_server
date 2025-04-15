import { ObjectId } from "mongodb";
import { Product } from "./product.model.js";
import { IProduct } from "./product.interface.js";
import { connectToDatabase } from "../util/DatabaseConnection.js";

const getAllProducts = async (filter = {}) => {
  try {
    // Construct the final filter with default isDeleted check
    const finalFilter = { isDeleted: { $ne: true }, ...filter };
    // Use Mongoose's `.find` method
    const products = await Product.find(finalFilter);
    return products;
  } catch (error) {
    console.error("Service Error (getAllProducts):", error);
    throw error;
  }
};

const addProduct = async (productData: IProduct) => {
  try {
    // Use Mongoose's `.create` method to add the product
    const product = await Product.create(productData);
    return product;
  } catch (err) {
    console.error("Service Error (addProduct):", err);
    throw err;
  }
};

const getProductById = async (id: string) => {
  try {
    // Use Mongoose's `.findOne` method to find product by ID
    const product = await Product.findOne({
      _id: new ObjectId(id),
      isDeleted: { $ne: true },
    });

    if (product) {
      if (product.quantity === 0) {
        product.stock = false;
        await product.save();
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
    // Use Mongoose's `.updateOne` to set `isDeleted` flag
    const result = await Product.updateOne({ _id: new ObjectId(id) }, { $set: { isDeleted: true } });
    return result.modifiedCount === 1;
  } catch (err) {
    console.error("Service Error (deleteProductById):", err);
    throw err;
  }
};

const deleteProductsMultiple = async (id: string[]) => {
  try {
    const objectId = id.map((id) => new ObjectId(id));
    const db = await connectToDatabase();

    const result = db.collection("products").updateMany({ _id: { $in: objectId } }, { $set: { isDeleted: true } });

    return result;
  } catch (err) {
    console.error("Service Error (deleteProductsMultiple):", err);
    throw err;
  }
};

// const updateProductById = async (id: string, updateData: Record<string, unknown>) => {
//   try {
//     const db = await connectToDatabase();
//     const result = await db.collection("products").updateOne(
//       { _id: new ObjectId(id) },
//       { $set: updateData }
//     );

//     return result;
//   } catch (err) {
//     console.error("Service Error (updateProductById):", err);
//     throw err;
//   }
// };

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

    // Check if all updateData fields match the existing product
    const hasChanges = Object.entries(updateData).some(([key, value]) => {
      return product[key] !== value;
    });

    if (!hasChanges) {
      return { success: false, message: "No changes detected.", id };
    }

    const result = await db.collection("products").updateOne({ _id: new ObjectId(id) }, { $set: updateData });

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
