import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import dbConnect from "../config/dbConnect.js";

dotenv.config();

const app = express();

dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

export default app;
