const User = require("../../models/users");
const verify = async (req, res, next) => {
  try {
    const user = await User.findOne({
      verificationToken: req.params.verificationToken,
    });
    if (!user) {
      res.status(404).json({ message: "Not found" });
    }
    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });
    res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    console.log(error);
  }
};
module.exports = verify;
