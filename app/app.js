import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import dbConnect from "../config/dbConnect.js";
import { globalErrHandler, notFound } from "../middleware/globalErrHandler.js";
import userRoutes from "../routes/userRoute.js";

dotenv.config();

const app = express();
app.use(cors());

dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


// routes
app.use("/api/v1/users", userRoutes);

//err middleware
app.use(notFound);
app.use(globalErrHandler);

export default app;
