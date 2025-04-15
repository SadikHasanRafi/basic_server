import { NextFunction, Request, RequestHandler, Response } from "express";
import { productService } from "./product.service";
import { productSchema } from "./product.validator";
import { ObjectId } from "mongodb";


const getAllProduct: RequestHandler = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts({ isDeleted: false }); 
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Controller Error:", error);
    next(error);
  }
};


const addProduct: RequestHandler = async (req, res, next) => {
    const parsed = productSchema.safeParse(req.body);
  
    if (!parsed.success) {
      const errors = parsed.error.errors.map((e) => ({
        field:   e.path[0] as string,
        message: e.message,
      }));
      res.status(400).json({ success: false, errors });
      return;  
    }
  
    const productData = parsed.data;
  
    try {
      const result = await productService.addProduct(productData);
  
      res.status(201).json({
        success: true,
        message: "Product added successfully",
        data:    result,
      });
      return; 
    } catch (err) {
      console.error("Controller Error:", err);
      next(err);  
      return;    
    }
  };


const getProductById: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
  
    // Manual validation for MongoDB ObjectId
    if (!ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }
  
    try {
      // Fetch the product by ObjectId
      const product = await productService.getProductById(id);
  
      if (!product) {
        res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
  
      // Return the product data
      res.status(200).json({
        success: true,
        data: product,
      });
      return;
    } catch (err) {
      console.error("Controller Error:", err);
      next(err);
    }
};


const deleteProductById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    res.status(400).json({
      success: false,
      message: "Invalid product ID",
    });
    return;
  }

  try {
    const wasDeleted = await productService.deleteProductById(id);

    if (!wasDeleted) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
    return;
  } catch (err) {
    console.error("Controller Error:", err);
    next(err);
    return;
  }
};


const deleteProductsMultiple: RequestHandler = async (req, res, next) => {
  const id: string[] = req.body.id;

  if (!Array.isArray(id) || id.length === 0) {
    res.status(400).json({
      success: false,
      message: "Please provide an array of product ID.",
    });
    return;    
  }

  try {
    const result = await productService.deleteProductsMultiple(id);

    if (result.modifiedCount === 0) {
      res.status(404).json({
        success: false,
        message: "No products were found or updated.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: `${result.modifiedCount} products marked as deleted.`,
    });
    return;
  } catch (err) {
    console.error("Controller Error (deleteProductsMultiple):", err);
    next(err);  
    return;
  }
};





const updateProductById = async (req:Request, res:Response) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    if (!id || !updateData || Object.keys(updateData).length === 0) {
      res.status(400).json( { message: "Product not found or no changes made",success: false, modifiedCount:0  } );
      return
    }

    const result = await productService.updateProductById(id, updateData);

    if (result.modifiedCount === 0) {
      res.status(404).json( result);
      return
    }

    res.status(200).json( result);
  } catch (err) {
    console.error("Controller Error (updateProductById):", err);
    res.status(500).json({ message: "Internal server error" });
    return
  }
};

  
  
  
  

export const productController = {
    getAllProduct,
    addProduct,
    getProductById,
    deleteProductById,
    deleteProductsMultiple,
    updateProductById
} 