import express from "express";
import { productRoutes } from "./product/product.route";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/product", productRoutes);

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/", async (req, res) => {
  res.send("Hello from goriber bicycle shop.");
});
