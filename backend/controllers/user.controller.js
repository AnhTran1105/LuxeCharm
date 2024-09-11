import { validationResult } from "express-validator";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

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

export const getUserInfo = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const id = req.user.id;
  try {
    const user = await User.findById(id);
    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      address: user.address,
      phoneNumber: user.phoneNumber,
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const isMatch = await bcryptjs.compare(currentPassword, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Current password is incorrect!" });
    }

    const hashedNewPassword = bcryptjs.hashSync(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully!" });
  } catch (error) {
    next(error);
  }
};

export const updateUserInfo = async (req, res, next) => {
  const { firstName, lastName, address, phoneNumber } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found!" });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (address) user.address = address;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    await user.save();
    res.status(200).json({
      message: "User information updated successfully!",
    });
  } catch (error) {
    next(error);
  }
};
