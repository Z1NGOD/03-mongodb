const jwt = require("jsonwebtoken");
const User = require("../models/users");
const { JWT_SECRET } = process.env;
const authorization = async (req, res, next) => {
  const authToken = req.headers.authorization || "";

  const [type, token] = authToken.split(" ");
  if (type !== "Bearer") {
    res.status(401).json({ message: "This token type is not allowed" });
  }

  if (!token) {
    res.status(401).json({ message: "Token is required" });
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id, { password: 0, __v: 0 });
    req.user = user;
    console.log(user);
  } catch (error) {
    if (error.name === "TokenExpiredError" || error.name === "JsonTokenError") {
      res.status(401).json({ message: "Token is expired" });
    }
    throw error;
  }
  next();
};
module.exports = authorization;
