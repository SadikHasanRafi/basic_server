import express from "express";
import { productRoutes } from "./product/product.route";
import { userRoutes } from "./userAuth/user.route";
import { connectToDatabase } from "./util/databaseConnection";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/product", productRoutes);
app.use("/user",userRoutes)

app.listen(port, async () => {
  await connectToDatabase();      
  console.log(`Example app listening on port ${port}`);
});

app.get("/", async (req, res) => {
  res.send("Hello from goriber bicycle shop.");
});
