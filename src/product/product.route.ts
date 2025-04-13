import  express  from 'express';
import { productController } from './product.controller';

const route = express.Router()

route.get("/get-all-product",productController.getAllProduct);
route.post("/add-product", productController.addProduct);


export const productRoutes = route