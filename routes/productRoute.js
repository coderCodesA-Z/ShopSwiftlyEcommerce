import express from "express";
import { createProductCtrl } from "../controllers/prdctCntrl.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";

const productRoutes = express.Router();

productRoutes.post("/", isLoggedIn, createProductCtrl);
productRoutes.get("/products", createProductCtrl);

export default productRoutes;
