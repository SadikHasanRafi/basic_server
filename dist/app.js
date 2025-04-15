"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_route_1 = require("./product/product.route");
const user_route_1 = require("./userAuth/user.route");
const databaseConnection_1 = require("./util/databaseConnection");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use("/product", product_route_1.productRoutes);
app.use("/user", user_route_1.userRoutes);
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, databaseConnection_1.connectToDatabase)();
    console.log(`Example app listening on port ${port}`);
}));
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Hello from goriber bicycle shop.");
}));
