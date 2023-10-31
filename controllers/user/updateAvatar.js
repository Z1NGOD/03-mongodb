const User = require("../../models/users");
const Jimp = require("jimp");
const path = require("path");
const uuid = require("uuid");
const fs = require("fs/promises");

const updateAvatar = async (req, res, next) => {
  try {
    const tmpPath = path.resolve(__dirname, "../../tmp", req.file.filename);
    const publicPath = path.resolve(__dirname, "../../public/avatars");

    const uniqueFilename = `${uuid.v4()}.${req.file.filename.split(".").pop()}`;
    const processedImagePath = path.join(publicPath, uniqueFilename);

    await Jimp.read(tmpPath).then((image) => {
      return image.resize(250, 250).quality(60).writeAsync(processedImagePath);
    });

    const user = await User.findById(req.user.id);
    if (user) {
      user.avatarURL = `/avatars/${uniqueFilename}`;
      await user.save();
    }
    fs.unlink(tmpPath);
    res.status(200).json({ avatarURL: user.avatarURL });
  } catch (error) {
    return res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = updateAvatar;
