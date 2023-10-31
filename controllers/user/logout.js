const User = require("../../models/users");

const logout = async (req, res, next) => {
  try {
    const user = req.user;
    const foundUser = await User.findById(user._id);
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await User.findByIdAndUpdate(foundUser, {
      $set: {
        token: null,
      },
    });

    res.status(204).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = logout;
