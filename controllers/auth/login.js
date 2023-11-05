const User = require("../../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401).json({ message: "Not authorized" });
  }
  if (!user.verify) {
    res.status(401).json({ message: "This user is NOT verified! Please check your mailbox!" });
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(401).json({ message: "Password is not valid" });
  }
  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
  res
    .status(200)
    .json({ token, user: { email, subscription: user.subscription } });
};
module.exports = login;
