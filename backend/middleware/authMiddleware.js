import jwt from "jsonwebtoken";

export const verifyAdmin = (req, res, next) => {
  const token = req.cookies.admin_token;
  if (!token) return res.status(403).json("You are not authenticated!");

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json("Token is not valid!");
    if (user.role !== "admin")
      return res.status(403).json("You are not authorized!");

    req.user = user;
    next();
  });
};
