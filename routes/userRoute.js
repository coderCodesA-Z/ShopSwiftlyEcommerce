import express from "express";
import {
	getUserProfileCntrl,
	loginUserCntrl,
	registerUserCntrl,
} from "../controllers/usersCntrl.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";

const userRoutes = express.Router();

userRoutes.post("/register", registerUserCntrl);
userRoutes.post("/login", loginUserCntrl);
userRoutes.get("/profile", isLoggedIn, getUserProfileCntrl);

export default userRoutes;
