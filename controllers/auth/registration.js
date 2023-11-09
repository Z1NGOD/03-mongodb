const User = require("../../models/users");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const sendEmail = require("../../helpers/sendEmail");

const registration = async (req, res, next) => {
  try {
    const user = await User.create({
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      avatarURL: await gravatar.url(req.body.email, {
        protocol: "https",
        s: "250",
      }),
      verificationToken: nanoid(),
    });

    await sendEmail({
      to: req.body.email,
      subject: "Please verify your email",
      html: `<h1>Please verify your email by clicking this link:</h1><a href="http://localhost:3000/api/users/verify/${user.verificationToken}">VERIFICATION LINK</a>`,
    });

    res.status(201).json({
      id: user.id,
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    });
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
