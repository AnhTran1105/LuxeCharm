import express from "express";
import { getAllUsers, getUserInfo } from "../controllers/user.controller.js";
import { verifyUser } from "../middlewares/auth.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/users/my-account", verifyUser, getUserInfo);

export default router;
