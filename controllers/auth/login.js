const users = require("../../models/users");
const bcrypt = require("bcrypt");
const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await users.findUser({ email });

  if (!user) {
    res.status(401).json({ message: "Email is not valid" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(401).json({ message: "Password is not valid" });
  }

  res.status(200).json({ token: "<TOKEN>" });
};
module.exports = login;
