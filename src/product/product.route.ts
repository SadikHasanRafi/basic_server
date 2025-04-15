import express from "express";
import { productController } from "./product.controller";

const route = express.Router();

route.get("/get-all-products", productController.getAllProduct);
route.post("/add-product", productController.addProduct);
route.get("/get-by-id/:id", productController.getProductById);
route.put("/remove-single/:id", productController.deleteProductById);
route.put("/remove-multiple", productController.deleteProductsMultiple);
route.put("/update-single/:id", productController.updateProductById);

export const productRoutes = route;
