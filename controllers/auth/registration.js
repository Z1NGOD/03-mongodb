const users = require("../../models/users");
const bcrypt = require("bcrypt");

const registration = async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user = await users.addUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).json({ message: error.message });
    } else if (error.name === "Error") {
      res.status(400).json({ message: "Password required" });
    } else {
      res.status(409).json({ message: "email in use" });
    }
  }
};
module.exports = registration;
