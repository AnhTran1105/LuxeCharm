import express from "express";
import {
  getAllUsers,
  getUserInfo,
  updateUserInfo,
  changePassword,
} from "../controllers/user.controller.js";
import { verifyUser } from "../middlewares/auth.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/users/my-account", verifyUser, getUserInfo);
router.put("/users/change-password", verifyUser, changePassword);
router.put("/users/update-info", verifyUser, updateUserInfo);

export default router;
