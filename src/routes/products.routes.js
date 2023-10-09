import { Router } from "express";
import { validateAuth } from "../middlewares/validateAuth.js";
import { showProducts, showMyProducts, createProduct, showProductsById } from "../controllers/products.controller.js";

const productsRouter = Router();

productsRouter.get("/products", showProducts);
productsRouter.get("/products/:id", showProductsById);
productsRouter.get("/me", validateAuth, showMyProducts);
productsRouter.post("/newproduct", validateAuth, createProduct);


export default productsRouter;