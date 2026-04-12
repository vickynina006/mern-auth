import express from "express";
import { getUserData } from "../controllers/userDataController.js";
import userAuth from "../middleware/userAuth.js";

const userDataRouter = express.Router();

userDataRouter.get("/userdata", userAuth, getUserData);

export default userDataRouter;
