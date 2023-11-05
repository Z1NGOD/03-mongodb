const sendEmail = require("../../helpers/sendEmail");
const User = require("../../models/users");

const verify = async (req, res, next) => {
  if (!req.body.email) {
    return res.status(400).json({ message: "Missing required field email" });
  }

  const user = await User.findOne({ email: req.body.email });

  if (user.verify === true) {
    res.status(400).json({ message: "Verification has already been passed" });
  }

  await sendEmail({
    to: req.body.email,
    subject: "Please verify your email",
    html: `<h1>Please verify your email by clicking this link:</h1><a href="http://localhost:3000/api/users/verify/${user.verificationToken}">VERIFICATION LINK</a>`,
  });
  res.status(200).json({ message: "Verification email sent" });
};

module.exports = verify;
