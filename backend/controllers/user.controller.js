import { validationResult } from "express-validator";
import User from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort("-lastUpdated");
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const id = req.params.id.toString();
  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};
