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

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validAdmin = await Admin.findOne({ email });
    if (!validAdmin)
      return next(errorHandler(404, "Your email address is incorrect!"));

    const validPassword = bcryptjs.compareSync(password, validAdmin.password);

    if (!validPassword)
      return next(errorHandler(401, "Your password is incorrect!"));

    const token = jwt.sign(
      { id: validAdmin._id, role: "admin" },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      })
      .status(200)
      .json({ message: "Logged in successfully!", access_token: token });
  } catch (error) {
    next(error);
  }
};
