import { Request, Response } from "express";
import { productService } from "./product.service";
import { productSchema } from "./product.validator";


const getAllProduct = async (req:Request, res:Response) => {
    try {
        const result = await productService.getAllProduct();
        res.send(result);
      } catch (err) {
        console.error("Controller Error:", err);
        res.status(500).send("Something went wrong");
      }
  };



  const addProduct = async (req: Request, res: Response) => {
    try {
      const parsed = productSchema.safeParse(req.body);
  
      if (!parsed.success) {
        const errors = parsed.error.errors.map((err) => ({
          field: err.path[0],
          message: err.message,
        }));
        return res.status(400).json({ success: false, errors });
      }
  
      const validatedData = parsed.data;
  
      if (validatedData.stock === undefined) {
        validatedData.stock = true;
      }
  
      const result = await productService.addProduct(validatedData);
      res.status(201).json({
        success: true,
        message: "Product added successfully",
        data: result,
      });
    } catch (err) {
      console.error("Controller Error:", err);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
  

export const productController = {
    getAllProduct,
    addProduct
} 