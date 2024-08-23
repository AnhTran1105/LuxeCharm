import Admin from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const createAdminAccount = async () => {
  try {
    const hashedPassword = bcryptjs.hashSync(process.env.ADMIN_PASSWORD, 10);
    const admin = new Admin({
      email: "admin@gmail.com",
      password: hashedPassword,
    });
    await admin.save();
    console.log("Admin account created successfully!");
  } catch (err) {
    console.error("Error creating admin account:", err);
  }
};

export const adminLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin)
      return next(errorHandler(404, "Admin email address is incorrect!"));

    const validPassword = bcryptjs.compareSync(password, admin.password);

    if (!validPassword)
      return next(errorHandler(401, "Admin password is incorrect!"));

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res
      .cookie("admin_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      })
      .status(200)
      .json({ message: "Admin logged in successfully!" });
  } catch (error) {
    next(error);
  }
};
